export class IngresoEgreso {
    constructor(
        public monto: number,
        public descripcion: string,
        public isIngreso: boolean,
    ) {}
}