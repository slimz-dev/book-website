import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from 'src/app/models/book';

export const bookSelector = createFeatureSelector<any>('books');
export const selectBooks = createSelector(bookSelector, (state) => state.Book);
