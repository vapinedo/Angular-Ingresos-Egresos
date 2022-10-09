import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedBackService } from 'src/app/services/feedback.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public user: Usuario | null = null;
  userSubs = new Subscription();

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>,
    private feedBackSvc: FeedBackService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((user) => user !== null))
      .subscribe((state) => (this.user = state.user));
  }

  onLogout(): void {
    this.auth
      .logout()
      .then((success) => {
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        this.feedBackSvc.error(error);
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
