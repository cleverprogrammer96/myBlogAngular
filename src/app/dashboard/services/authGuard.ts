import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate  {

    constructor(private _authService:AuthService, private _route:Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this._authService.user.pipe(
           take(1),
           map(user => {
            const isAuth =  !!user;
        if(isAuth) return true;
        return this._route.createUrlTree(['/login']);
       }
       ))
    }

}