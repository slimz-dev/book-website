import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import userReducerAction from '../state/user/user.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  accessToken: string | null = null;
  private apiUrl = 'https://localhost:5000/api';
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private store: Store,
    private route: Router
  ) {
    this.accessToken = this.storage.get('accessToken');
  }

  loginUser(userName: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      userName: userName,
      password: password,
    });
  }

  getUser() {
    return this.http.get<any>(`${this.apiUrl}/auth`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  refreshTokens() {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {});
  }

  logoutUser() {
    this.store.dispatch(userReducerAction.setUser({ user: null }));
    this.storage.remove('accessToken');
    this.accessToken = null;
    this.route.navigate(['/']);
  }
}
