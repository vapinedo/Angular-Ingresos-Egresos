export class IngresoEgreso {
    constructor(
        public uid: string,
        public monto: number,
        public descripcion: string,
        public isIngreso: boolean,
    ) {}
}