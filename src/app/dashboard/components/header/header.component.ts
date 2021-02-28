import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;
  loggedInUser:String;

  constructor(private _authService:AuthService, private _route:Router) { }

  ngOnInit(): void {

    this._authService.user.subscribe(
      user=>{
        if(user){
          this.isLoggedIn = !!user;
          this.loggedInUser = user.email;
        }

      }
    )
  }

  logOut() {
    this._authService.user.next(null);
    localStorage.removeItem('user');
    this._route.navigate(['/login']);

  }

}
