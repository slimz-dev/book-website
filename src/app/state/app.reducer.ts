import { bookReducer } from './book/book.reducer';
import { userReducer } from './user/user.reducer';

export const reducers = {
  books: bookReducer,
  user: userReducer,
};
