import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userSelector = createFeatureSelector<any>('user');
export const selectUser = createSelector(userSelector, (state) => state.user);
