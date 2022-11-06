import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { FeedBackService } from '../../services/feedback.service';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  ingresoEgresoList: IngresoEgreso[] = [];

  constructor(
    private store: Store<AppStateWithIngreso>,
    private FeedBackSvc: FeedBackService,
    private ingresoEgresoSvc: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select("ingresoEgresos").subscribe(state => {
      this.ingresoEgresoList = state.items;
    });
  }

  getClassBasedOnType(tipoIngresoEgreso: string): string {
    return (tipoIngresoEgreso == "ingreso") 
      ? "badge badge-primary" 
      : "badge badge-danger";
  }

  async onDeleteById(id: string): Promise<void> {
    const response = await this.ingresoEgresoSvc.delete(id);
    (response == undefined)
      ? this.FeedBackSvc.success("Registro eliminado exitosamente!")
      : this.FeedBackSvc.error("Error al eliminar registro");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
