import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

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
    private store: Store<AppState>
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

  onDeleteById(id: string): void {
    console.log({id});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
