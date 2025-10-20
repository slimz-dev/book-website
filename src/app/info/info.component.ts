import { Component } from '@angular/core';
import { Book } from '../models/book';
import { Store } from '@ngrx/store';
import { selectBooks } from '../state/book/book.selectors';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUser } from '../state/user/user.selectors';

interface User {
  userName: string;
  name: string;
  dateOfBirth: string; // ISO string or Date
  booksList: Observable<Book[]>;
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent {
  $books = of([]);
  $user = of<User | null>(null);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.$books = this.store
      .select(selectBooks)
      .pipe(map((books) => books ?? []));
    this.$user = this.store.select(selectUser);
  }
}
