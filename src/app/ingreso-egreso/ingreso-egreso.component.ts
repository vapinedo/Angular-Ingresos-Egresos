import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {
  form: FormGroup;
  isTipoIngreso: boolean = true;

  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],

    });
  }

  ngOnInit(): void {
  }

  toggleTipoIngreso(): void {
    this.isTipoIngreso = !this.isTipoIngreso;
  }

  onSubmitForm(): void {
    if (this.form.invalid) { return; }

    console.log(this.form.value);
  }

}
