import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isIngreso: boolean = true;
  isLoadingSpinner: boolean = false;
  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private feedBackSvc: FeedBackService,
    private store: Store<AppState>,
    private ingresoEgresoSvc: IngresoEgresoService
  ) { 
    this.form = fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions = this.store.select("ui").subscribe(state => {
      this.isLoadingSpinner = state.isLoading;
    });
  }

  toggleTipoIngreso(): void {
    this.isIngreso = !this.isIngreso;
  }

  async onSubmitForm() {
    if (this.form.invalid) { return; }
    
    this.store.dispatch(uiActions.isLoading());
    const { descripcion, monto } = this.form.value;
    const ingresoEgreso = new IngresoEgreso(monto, descripcion, this.isIngreso);
    const response = await this.ingresoEgresoSvc.create(ingresoEgreso);
    this.store.dispatch(uiActions.stopLoading());
    (response == undefined) 
      ? this.feedBackSvc.success()
      : this.feedBackSvc.error();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}
