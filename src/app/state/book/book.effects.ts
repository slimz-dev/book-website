import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from 'src/app/services/book.service';
import BookActions from './book.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { EMPTY, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
@Injectable()
export class BookEffects {
  loadBooks$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => {
        return this.bookService.getBooks().pipe(
          map((books: Book[]) => BookActions.loadBooksSuccess({ books })),
          catchError(() => {
            this.toast.showError('Failed to load books');
            return EMPTY;
          })
        );
      })
    );
  });

  createBooks$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(BookActions.tryAddBook),
      switchMap(({ book }) => {
        return this.bookService.addBook(book).pipe(
          map((newBook: Book) => {
            this.toast.showSuccess('Book added successfully');
            return BookActions.addBookSuccess({ book: newBook });
          }),
          catchError((err) => {
            this.toast.showError(err.error || 'Unknown error occurred');
            return of(BookActions.failure());
          })
        );
      })
    );
  });

  removeBook$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(BookActions.tryRemoveBook),
      switchMap(({ id }) => {
        return this.bookService.deleteBook(id).pipe(
          map(() => {
            this.toast.showSuccess('Book removed successfully');
            return BookActions.removeBookSuccess({ id });
          }),
          catchError((err) => {
            this.toast.showError(err.error || 'Unknown error occurred');
            return of(BookActions.failure());
          })
        );
      })
    );
  });

  changeBook$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(BookActions.tryChangeBook),
      switchMap(({ book }) => {
        return this.bookService.patchingBook(book).pipe(
          map((updatedBook: Book) => {
            this.toast.showSuccess('Book updated successfully');
            return BookActions.changeBookSuccess({ book: updatedBook });
          }),
          catchError((err) => {
            this.toast.showError(err.error || 'Unknown error occurred');
            return of(BookActions.failure());
          })
        );
      })
    );
  });

  constructor(
    private action$: Actions,
    private bookService: BookService,
    private toast: ToastService
  ) {}
}
