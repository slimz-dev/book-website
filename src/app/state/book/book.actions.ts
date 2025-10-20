import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';

const loadBooks = createAction('[Books] Load Books');
const addBookSuccess = createAction(
  '[Books] Add Book',
  props<{ book: Book }>()
);
const removeBookSuccess = createAction(
  '[Books] Remove Book',
  props<{ id: number }>()
);
const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);

const changeBookSuccess = createAction(
  '[Books] Change Book',
  props<{ book: Book }>()
);

const tryAddBook = createAction(
  '[Books] Try Add Book',
  props<{ book: Book }>()
);
const tryRemoveBook = createAction(
  '[Books] Try Remove Book',
  props<{ id: number }>()
);
const tryChangeBook = createAction(
  '[Books] Try Change Book',
  props<{ book: Book }>()
);

const failure = createAction('[Books] Failure');

const BookActions = {
  loadBooks,
  addBookSuccess,
  removeBookSuccess,
  loadBooksSuccess,
  changeBookSuccess,
  tryAddBook,
  tryRemoveBook,
  tryChangeBook,
  failure,
};
export default BookActions;
