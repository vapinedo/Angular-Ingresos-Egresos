import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) { 
    this.form = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get email() { return this.form.get("email"); }
  get password() { return this.form.get("email"); }

  ngOnInit(): void {
  }

  onLogin(): void {
    const { email, password } = this.form.value;
    this.authSvc.loginUsuario(email, password)
      .then(success => {
        console.log(success);
        this.router.navigateByUrl("/");
      })
      .catch(error => console.warn(error));
  }

}
