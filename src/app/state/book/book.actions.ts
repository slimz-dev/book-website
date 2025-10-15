import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';

export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);
