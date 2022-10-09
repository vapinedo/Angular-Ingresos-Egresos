import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  egresos: number = 0;
  ingresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.store.select("ingresoEgresos")
      .subscribe(({ items }) => this.generarEstadistica(items));
  }
  
  generarEstadistica(items: IngresoEgreso[]) {
    this.resetIngresoEgreso();

    for(const item of items) {
      if(item.tipo === "ingreso") {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    const chartDataSet = {
      data: [this.totalIngresos, this.totalEgresos]
    };
    this.doughnutChartData.datasets = [chartDataSet];
  }

  resetIngresoEgreso(): void {
    this.egresos= 0;
    this.ingresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }

}
