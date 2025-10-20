import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.componenet.html',
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];
  user$: Observable<User | null> = this.store.select(selectUser);
  loggedInItems: MenuItem[] = [];
  loggedOutItems: MenuItem[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.loggedInItems = [
      {
        label: 'Info',
        icon: 'pi pi-fw pi-info-circle',
        command: () => this.router.navigate(['/info']),
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];

    this.loggedOutItems = [
      {
        label: 'Info',
        icon: 'pi pi-fw pi-info-circle',
        command: () => this.router.navigate(['/info']),
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        command: () => this.router.navigate(['/login']),
      },
    ];
  }
  logout() {
    this.userService.logoutUser();
  }
}
