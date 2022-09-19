import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedBackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private feedBackSvc: FeedBackService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout()
      .then(success => {
        this.router.navigateByUrl("/login");
      })
      .catch(error => {
        this.feedBackSvc.error();
      });
  }

}
