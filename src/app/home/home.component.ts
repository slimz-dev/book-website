import { Component, OnInit } from '@angular/core';

import { z } from 'zod';
import { ToastService } from 'src/app/services/toast.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { loadBooks } from '../state/book/book.actions';
import { Store } from '@ngrx/store';
import { selectBooks } from '../state/book/book.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  hi = this.store.select(selectBooks);
  books: Book[] = [];
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
  constructor(
    private store: Store,
    private bookService: BookService,
    private toast: ToastService
  ) {}

  ngDoCheck(): void {
    this.hi.subscribe((data) => console.log(data));
  }
  ngOnInit(): void {
    this.store.dispatch(loadBooks());
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error || 'Unknown error occurred');
      },
    });
    // this.store.select('books').subscribe((state: any) => {
    //   this.books = state.books;
    // });
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
    this.bookService.addBook(book).subscribe({
      next: (newBook: Book) => {
        this.toast.showSuccess('Book added successfully');
        this.books.push(newBook);
        this.showModal = false;
      },
      error: (err: any) => {
        this.toast.showError(err.error || 'Unknown error occurred');
      },
    });
  }
  handleDelete(book: Book) {
    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.toast.showSuccess('Book deleted successfully');
        this.books = this.books.filter((b) => b.id !== book.id);
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error || 'Unknown error occurred');
      },
    });
  }

  handleChange(book: Book) {
    this.bookService.patchingBook(book).subscribe({
      next: (updatedBook: Book) => {
        this.toast.showSuccess('Book updated successfully');
        const index = this.books.findIndex((b) => b.id === updatedBook.id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error || 'Unknown error occurred');
      },
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
