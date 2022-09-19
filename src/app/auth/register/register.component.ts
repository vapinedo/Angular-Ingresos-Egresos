import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FeedBackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cargando: boolean = false;
  subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private store: Store<AppState>,
    private feedBackSvc: FeedBackService,
  ) { 
    this.form = fb.group({
      nombre: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get nombre() { return this.form.get("nombre"); }
  get email() { return this.form.get("email"); }
  get password() { return this.form.get("nombre"); }

  ngOnInit(): void {
    this.subscription = this.store.select("ui").subscribe(ui => {
      this.cargando = ui.isLoading;
    })
  }

  onRegister(): void {
    if(this.form.invalid) { return; }

    this.store.dispatch(uiActions.isLoading());

    const { nombre, email, password } = this.form.value;
    this.authSvc.crearUsuario(nombre, email, password)
      .then(credenciales => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        this.store.dispatch(uiActions.stopLoading());
        this.feedBackSvc.error();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
