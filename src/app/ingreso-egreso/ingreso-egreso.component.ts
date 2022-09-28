import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { FeedBackService } from '../services/feedback.service';
import * as ingresoEgresoActions from './ingreso-egreso.actions';
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
    private store: Store<AppState>,
    private feedBackSvc: FeedBackService,
    private ingresoEgresoSvc: IngresoEgresoService
  ) { 
    this.form = fb.group({
      tipo: ["", Validators.required],
      monto: ["", Validators.required],
      uid: [uuidv4(), Validators.required],
      descripcion: ["", Validators.required],
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
    const { uid, descripcion, monto, tipo } = this.form.value;
    const item = new IngresoEgreso(uid, tipo, Number(monto), descripcion );

    const response = await this.ingresoEgresoSvc.create(item);
    this.store.dispatch(uiActions.stopLoading());
    
    if (response == undefined) {
      this.store.dispatch(ingresoEgresoActions.setItem({ item: item }));
      this.feedBackSvc.success();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}
