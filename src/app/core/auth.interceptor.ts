import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken = new BehaviorSubject<string | null>(
    this.storage.get('accessToken')
  );
  isRefreshing = false;
  constructor(
    private userService: UserService,
    private storage: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('No-Auth')) {
      return next.handle(request);
    }

    const clonedReq = request.clone({
      withCredentials: true,
    });

    if (clonedReq.url.includes('/auth/refresh')) {
      return next.handle(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          this.userService.logoutUser();
          return throwError(() => error);
        })
      );
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.msg === 'TokenExpired') {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.accessToken.next(null);
            return this.userService.refreshTokens().pipe(
              switchMap((res: any) => {
                const clonedRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`,
                  },
                });
                this.accessToken.next(res.accessToken);
                this.isRefreshing = false;
                return next.handle(clonedRequest);
              }),
              catchError((refreshError) => {
                this.isRefreshing = false;
                return throwError(() => refreshError);
              })
            );
          } else {
            this.accessToken.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((token) => {
                const clonedRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                return next.handle(clonedRequest);
              })
            );
          }
        }
        return throwError(() => error);
      })
    );
  }
}
