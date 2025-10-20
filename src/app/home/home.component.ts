import { Component, OnInit } from '@angular/core';

import { map, z } from 'zod';
import { ToastService } from 'src/app/services/toast.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import BookActions from '../state/book/book.actions';
import { Store } from '@ngrx/store';
import { selectBooks } from '../state/book/book.selectors';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books$: Observable<Book[]> = this.store.select(selectBooks);
  showModal = false;
  selectedBook: Book | null = null;
  BookSchema = z.object({
    id: z.number(),
    bookName: z.string(),
    authorName: z.string(),
    price: z.number(),
    url: z.string(),
    description: z.string(),
  });
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }

  openAddModal() {
    this.selectedBook = null;
    this.showModal = true;
  }

  openEditModal = (book: Book) => {
    this.selectedBook = { ...book };
    this.showModal = true;
  };

  handleSave(book: Book) {
    this.store.dispatch(BookActions.tryAddBook({ book }));
    //  this.store.
  }
  handleDelete(book: Book) {
    this.store.dispatch(BookActions.tryRemoveBook({ id: book.id }));
  }

  handleChange(book: Book) {
    this.store.dispatch(BookActions.tryChangeBook({ book }));
  }

  closeModal() {
    this.showModal = false;
  }
}
