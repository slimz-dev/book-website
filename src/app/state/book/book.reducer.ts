import { createReducer, on } from '@ngrx/store';
import { loadBooks, loadBooksSuccess } from './book.actions';
import { Book } from 'src/app/models/book';

interface initialState {
  Book: Book[];
  loading: boolean;
}

const initalState: initialState = {
  Book: [],
  loading: false,
};

export const bookReducer = createReducer(
  initalState,
  on(loadBooks, (state) => ({ ...state, loading: true })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    Book: books,
    loading: false,
  }))
);
