import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from 'src/app/services/book.service';
import { loadBooks, loadBooksSuccess } from './book.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { EMPTY } from 'rxjs';
@Injectable()
export class BookEffects {
  loadBooks$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(loadBooks),
      switchMap(() => {
        console.log('effects');
        return this.bookService.getBooks().pipe(
          map((books: Book[]) => loadBooksSuccess({ books })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  constructor(private action$: Actions, private bookService: BookService) {}
}
