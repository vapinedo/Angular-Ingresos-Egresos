import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoSvc: IngresoEgresoService,
  ) { }

  async ngOnInit() {
    const ingresoEgresoList: any = await this.ingresoEgresoSvc.read();
    if (ingresoEgresoList != null) {
      this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresoEgresoList }))
    }
  }

}
