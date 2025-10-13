import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() selectBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<Book>();

  handleChange() {
    this.selectBook.emit(this.book);
  }

  handleDelete() {
    this.deleteBook.emit(this.book);
  }
}
