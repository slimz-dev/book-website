import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

const fetchingUser = createAction('[User] Fetching User');
const setUser = createAction('[User] Set User', props<{ user: User | null }>());
const fetchingUserSuccess = createAction(
  '[User] Fetching User Success',
  props<{ user: User }>()
);
const fetchingUserFailure = createAction('[User] Fetching User Failure');

const userReducerAction = {
  fetchingUser,
  fetchingUserSuccess,
  fetchingUserFailure,
  setUser,
};

export default userReducerAction;
