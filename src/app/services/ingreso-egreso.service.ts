import { Injectable } from "@angular/core";
import { firebaseDB } from 'src/environments/environment';
import { DocumentData } from "@angular/fire/compat/firestore";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { collection, doc, getDocs, setDoc, deleteDoc } from '@firebase/firestore';

@Injectable({
    providedIn: "root"
})
export class IngresoEgresoService {

    private readonly collectionName = "ingreso-egreso";
    private readonly collection = collection(firebaseDB, this.collectionName);

    constructor() {}
    
    async create(document: IngresoEgreso): Promise<void | null> {
        try {
            const docId = document.uid;
            const docConfig = doc(this.collection, docId);
            return await setDoc(docConfig, {...document});
        } catch (error) {
            return null;
        }
    }

    async read(): Promise<DocumentData[] | null> {
        try {
            const documentData = await getDocs(this.collection);
            const collection = documentData.docs.map(item => item.data());
            return collection;
        } catch(error) {
            return null;
        }
    }

    async delete(uid: string): Promise<void> {
        const docID = uid;
        return await deleteDoc(doc(this.collection, docID));
    }
}