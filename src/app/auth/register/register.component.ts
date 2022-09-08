import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
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
  }

  onRegister(): void {
    if(this.form.invalid) { return; }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { nombre, email, password } = this.form.value;
    this.authSvc.crearUsuario(nombre, email, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      });
  }

}
