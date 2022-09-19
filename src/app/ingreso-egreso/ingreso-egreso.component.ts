import { Component, OnInit } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { FeedBackService } from '../services/feedback.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {
  form: FormGroup;
  isIngreso: boolean = true;

  constructor(
    private fb: FormBuilder,
    private feedBackSvc: FeedBackService,
    private ingresoEgresoSvc: IngresoEgresoService
  ) { 
    this.form = fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],

    });
  }

  ngOnInit(): void {
  }

  toggleTipoIngreso(): void {
    this.isIngreso = !this.isIngreso;
  }

  async onSubmitForm() {
    if (this.form.invalid) { return; }

    const { descripcion, monto } = this.form.value;
    const ingresoEgreso = new IngresoEgreso(monto, descripcion, this.isIngreso);
    const response = await this.ingresoEgresoSvc.create(ingresoEgreso);
    (response == undefined) 
      ? this.feedBackSvc.success()
      : this.feedBackSvc.error();
  }

}
