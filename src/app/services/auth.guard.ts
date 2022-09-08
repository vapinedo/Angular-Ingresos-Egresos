import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap(isAuth => {
        if (isAuth === false) { this.router.navigateByUrl("/login"); }
      })
    );
  }
  
}
