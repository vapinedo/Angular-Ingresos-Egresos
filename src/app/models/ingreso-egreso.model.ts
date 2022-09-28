export class IngresoEgreso {
    constructor(
        public uid: string,
        public tipo: string,
        public monto: number,
        public descripcion: string,
    ) {}
}