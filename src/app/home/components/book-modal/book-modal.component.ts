import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
})
export class BookModalComponent implements OnChanges {
  private initialized = true;
  @Input() isOpen = false;
  @Input() selectedBook: Book | null = null;
  @Output() save = new EventEmitter<Book>();
  @Output() close = new EventEmitter<void>();
  @Output() changeEvent = new EventEmitter<Book>();
  bookForm = new FormGroup({
    id: new FormControl('', Validators.required),
    bookName: new FormControl('', Validators.required),
    authorName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1000)]),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBook'] && this.selectedBook) {
      this.bookForm.patchValue(this.selectedBook);
    } else {
      this.bookForm.reset();
    }
  }

  onSubmit() {
    console.log('submitting');
    if (this.bookForm.valid && !this.selectedBook) {
      this.save.emit(this.bookForm.value as Book);
    } else {
      if (this.bookForm.valid && this.selectedBook) {
        this.changeEvent.emit(this.bookForm.value as Book);
      }
    }
  }

  onClose() {
    this.close.emit();
  }
}
