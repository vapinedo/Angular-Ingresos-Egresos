import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cargando: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private store: Store<AppState>
  ) { 
    this.form = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get email() { return this.form.get("email"); }
  get password() { return this.form.get("email"); }

  ngOnInit(): void {
    this.subscription = this.store.select("ui").subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  onLogin(): void {
    if(this.form.invalid) { return; }

    this.store.dispatch(uiActions.isLoading());
    const { email, password } = this.form.value;

    this.authSvc.loginUsuario(email, password)
      .then(success => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
