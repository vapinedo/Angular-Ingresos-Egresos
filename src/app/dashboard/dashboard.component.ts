import { Component, OnInit } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  ingresoEgresoList: any[] | undefined;

  constructor(
    private ingresoEgresoSvc: IngresoEgresoService,
  ) { }

  async ngOnInit() {
    const response = await this.ingresoEgresoSvc.read();
    (response == null) 
      ? console.log("There are not record yet")
      : this.ingresoEgresoList = response;
  }

}
