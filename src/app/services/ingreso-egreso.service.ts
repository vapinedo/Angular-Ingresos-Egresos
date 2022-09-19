import { v4 as uuidv4 } from 'uuid';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { firebaseDB } from 'src/environments/environment';
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { collection, doc, getDocs, setDoc } from '@firebase/firestore';

@Injectable({
    providedIn: "root"
})
export class IngresoEgresoService {

    private readonly subCollection = "items";
    private readonly collection = collection(firebaseDB, "ingreso-egreso");

    constructor(private authSvc: AuthService) {}
    
    async create(document: IngresoEgreso): Promise<any> {
        try {
            const docId = uuidv4();
            const collectionId = String(this.authSvc.user.uid);
            const documentRef = doc(this.collection, collectionId, this.subCollection, docId);
            return await setDoc(documentRef, {...document});
        } catch (error) {
            console.warn("Error adding document: ", error);
            return error;
        }
    }

    async read(): Promise<any[]> {
        const documentData = await getDocs(this.collection);
        const documentList = documentData.docs.map(item => item.data());
        return documentList;
    }
}