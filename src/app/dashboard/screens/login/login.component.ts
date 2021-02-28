import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:any;
  isLoading:boolean = false;

  constructor(private _authService:AuthService, private _route:Router, private _notification:NotificationService) { }

  ngOnInit(): void {
    if(!!JSON.parse(localStorage.getItem('user'))) {
      this._route.navigate(['/blog']);
    }

  }
  onSubmit(form:NgForm) {

    let loginObs: Observable<any>;
    loginObs = this._authService.login();
    this.isLoading=true;
    loginObs.subscribe(
      data=>{

        if(data?.credentials?.email==form.value.email_id && data?.credentials?.password==form.value.password) {
          console.log("---------------------", data);

          const user = new User(data?.credentials?.email);
          this._authService.user.next(user);
          localStorage.setItem('user', JSON.stringify(user.email));

          let prevBlog = JSON.parse(localStorage.getItem('blogData'));
          console.log("prev data",prevBlog?.blog?.length>0)

          if(prevBlog == undefined) {
            localStorage.setItem('blogData', JSON.stringify(data));
          }

          this._notification.showSuccess("Successfully Logged in", "SUCCESS");
          this._route.navigate(['/blog']);
          this.isLoading=false;
        }
        else {

          this._notification.showError("Invalid Credentials...Please try again", "ERROR");
          this.isLoading=false;
        }




      },
      errorResp=>{
        console.log(errorResp);
        this._notification.showError("Invalid Credentials...Please try again", "ERROR");
        this.isLoading=false;
      }
    )
  }
register() {
  this._route.navigate(['/signup'])
}

}
