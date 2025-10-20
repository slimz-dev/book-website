import { createFeatureSelector, createSelector } from '@ngrx/store';

export const bookSelector = createFeatureSelector<any>('books');
export const selectBooks = createSelector(bookSelector, (state) => state.Book);
