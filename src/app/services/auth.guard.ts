import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap(isAuth => {
        if (isAuth === false) { this.router.navigateByUrl("/login"); }
      }),
      take(1)
    );
  }

  canLoad(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap(isAuth => {
        if (isAuth === false) { this.router.navigateByUrl("/login"); }
      })
    );
  }

}
