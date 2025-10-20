import { Book } from './book';

export interface User {
  Id: number;
  UserName: string;
  Name: string;
  imgUrl: string;
  DateOfBirth: Date;
  BooksList: Book[];
}
