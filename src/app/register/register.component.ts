import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      imgUrl: [''],
      dateOfBirth: [null, Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const user: User = this.registerForm.value;
    console.log('Register:', user);
    // TODO: call API
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
