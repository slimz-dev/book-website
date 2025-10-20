import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Store } from '@ngrx/store';
import userReducerAction from '../state/user/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private storage: StorageService,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.userService
      .loginUser(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          this.storage.set('accessToken', response.accessToken);
          this.store.dispatch(
            userReducerAction.setUser({ user: response.user })
          );
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
