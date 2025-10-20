import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:5000/api';
  constructor(private httpService: HttpClient, private toast: ToastService) {}
  getBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>(`${this.apiUrl}/books`, {
      headers: {
        'No-Auth': 'true',
      },
    });
  }

  addBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(`${this.apiUrl}/books`, book, {
      headers: {
        'No-Auth': 'true',
      },
    });
  }

  deleteBook(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/books/?Id=${id}`, {
      headers: {
        'No-Auth': 'true',
      },
    });
  }

  patchingBook(book: Book): Observable<Book> {
    const patchArray: { op: string; path: string; value: string }[] = [];
    Object.keys(book).forEach((key) => {
      if (key !== 'id') {
        patchArray.push({
          op: 'replace',
          path: `/${this.convertToPascalCase(key)}`,
          value: (book as any)[key],
        });
      }
    });
    return this.httpService.patch<Book>(
      `${this.apiUrl}/books?id=${book.id}`,
      patchArray,
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
          Accept: 'application/json',
          'No-Auth': 'true',
        },
      }
    );
  }

  convertToPascalCase(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }
}
