import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

import { OrdenIngresoPipe } from "../pipes/orden-ingreso.pipe";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

const declarations = [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
];

@NgModule({
    declarations: [declarations],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        NgChartsModule,
        SharedModule,
        RouterModule
    ]
})
export class IngresoEgresoModule {}