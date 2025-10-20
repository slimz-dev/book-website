import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import userReducerAction from './user.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class userEffect {
  constructor(private $action: Actions, private userService: UserService) {}
  userFetching$ = createEffect(() => {
    return this.$action.pipe(
      ofType(userReducerAction.fetchingUser),
      switchMap(() => {
        return this.userService.getUser().pipe(
          map((user) => {
            return userReducerAction.fetchingUserSuccess({ user });
          }),
          catchError(() => of(userReducerAction.fetchingUserFailure()))
        );
      })
    );
  });
}
