import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
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
    console.log(this.form);
    console.log(this.form.valid);
    console.log(this.form.value);
  }

}
