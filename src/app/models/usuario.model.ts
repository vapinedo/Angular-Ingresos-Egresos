import { DocumentData } from '@firebase/firestore';
export class Usuario {
    constructor(
        public uid: string | null,
        public email: string | null,
        public nombre: string | null,
    ) {}

    static fromFirebase({ uid, email, nombre }: any): Usuario {
        return new Usuario(uid, email, nombre);
    }
}