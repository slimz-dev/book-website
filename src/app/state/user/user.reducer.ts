import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import userReducerAction from './user.action';

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(userReducerAction.fetchingUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userReducerAction.fetchingUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
  })),
  on(userReducerAction.fetchingUserFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(userReducerAction.setUser, (state, { user }) => ({
    ...state,
    user,
  }))
);
