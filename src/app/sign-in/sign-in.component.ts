import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AppState,selectAuthState  } from '../store/app.states';
import { SignUp } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage!: string | null;
  constructor( private store: Store<AppState>) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  onSubmit() {
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }
}
