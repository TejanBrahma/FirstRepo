import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Store } from '@ngrx/store';
import { AppState,selectAuthState  } from '../store/app.states';
import {LogIn} from '../store/actions/auth.actions'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage!: string | null;

  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state:any) => {
      this.errorMessage = state.errorMessage;
    });
  }
  onSubmit(): void {
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password,
    };
    this.store.dispatch(new LogIn(payload));
  }
  }

