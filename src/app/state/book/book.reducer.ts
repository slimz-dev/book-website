import { createReducer, on } from '@ngrx/store';
import BookActions from './book.actions';
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
  on(BookActions.loadBooks, (state) => ({ ...state, loading: true })),
  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    Book: books,
    loading: false,
  })),
  on(BookActions.tryAddBook, (state) => ({ ...state, loading: true })),
  on(BookActions.tryRemoveBook, (state) => ({ ...state, loading: true })),
  on(BookActions.tryChangeBook, (state) => ({ ...state, loading: true })),
  on(BookActions.failure, (state) => ({ ...state, loading: false })),
  on(BookActions.addBookSuccess, (state, { book }) => ({
    ...state,
    Book: [...state.Book, book],
    loading: false,
  })),
  on(BookActions.removeBookSuccess, (state, { id }) => ({
    ...state,
    Book: state.Book.filter((book) => book.id !== id),
    loading: false,
  })),
  on(BookActions.changeBookSuccess, (state, { book }) => ({
    ...state,
    Book: state.Book.map((b) => (b.id === book.id ? book : b)),
    loading: false,
  }))
);
