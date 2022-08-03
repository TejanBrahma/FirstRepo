import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import {AuthActionTypes,LogIn,LogInFailure,LogInSuccess, SignUp, SignUpSuccess, SignUpFailure,LogOut} from '../store/actions/auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs';
@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // effects go here
  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: any) => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          return new LogInSuccess({
            token: user.token,
            email: payload.email,
          });
        }),
        catchError((error) => {
          console.log(error);
          return of(new LogInFailure({ error }));
        })
      );
    })
  );
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user:any) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload: any) => {
      return this.authService.signUp(payload.email, payload.password).pipe(
        map((user) => {
          return new SignUpSuccess({
            token: user.token,
            email: payload.email,
          });
        }),
        catchError((error) => {
          console.log(error);
          return of(new SignUpFailure({ error }));
        })
      );
    })
  );
  @Effect({ dispatch: false })
SignUpSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.SIGNUP_SUCCESS),
  tap((user:any) => {
    localStorage.setItem('token', user.payload.token);
    this.router.navigateByUrl('/');
  })
);
@Effect({ dispatch: false })
SignUpFailure: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.SIGNUP_FAILURE)
);
@Effect({ dispatch: false })
public LogOut: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGOUT),
  tap((user:any) => {
    localStorage.removeItem('token');
  })
);
}
