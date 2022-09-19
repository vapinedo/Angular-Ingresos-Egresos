import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import * as authActions from '../auth/auth.actions';
import { firebaseDB } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, setDoc, getDoc, DocumentData } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: Usuario;

  private readonly collectionName = "users";
  private readonly collectionRef = collection(firebaseDB, this.collectionName);

  constructor(
    public auth: AngularFireAuth,
    private store: Store<AppState>
  ) { }

  get user(): Usuario {
    return this._user;
  }

  async initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if(firebaseUser != null) {
        this.readById(firebaseUser.uid)
          .then((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          })
          .catch(error => console.warn("Error: ", error));
      } else {
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  async readById(docId: string): Promise<DocumentData | undefined> {
    const docRef = doc(this.collectionRef, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : undefined;
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      if (user !== null) {
        const docId = String(user.uid);
        const docPayload = { nombre, email, uid: docId };
        return await setDoc(doc(this.collectionRef, docId), docPayload);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  loginUsuario(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    ); 
  }
}
