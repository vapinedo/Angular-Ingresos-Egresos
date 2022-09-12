import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { firebaseDB } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, DocumentData } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly collectionName = "users";
  private readonly collectionRef = collection(firebaseDB, this.collectionName);

  constructor(
    public auth: AngularFireAuth,
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe(firebaseUser => {
      console.log(firebaseUser);
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);
    });
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      if (user !== null) {
        const docId = String(user.uid);
        const docPayload = { nombre, email, password, uid: docId };
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
