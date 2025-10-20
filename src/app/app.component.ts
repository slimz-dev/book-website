import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from './services/user.service';
import userReducerAction from './state/user/user.action';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-website';
  constructor() {}
  ngOnInit(): void {}
}
