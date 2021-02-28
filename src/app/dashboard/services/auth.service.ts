import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  user = new BehaviorSubject<User>(null);

  login() {
    return this._http.get<any>('../../../assets/data.json').pipe(timeout(5000),

      catchError(this.handleError)
    );

  }

  private handleError(httpError: HttpErrorResponse) {
    return throwError("An unknown Error Occured");
  }
  autoLogin() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if(!userInfo) {
      return;
    }
    const user = new User(userInfo);
    this.user.next(user);
  }
}
