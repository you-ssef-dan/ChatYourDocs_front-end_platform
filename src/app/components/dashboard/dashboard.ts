// File: src/app/components/dashboard/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  username: string = '';
  roles: string[] = [];

  // dynamic values passed to children
  usersCount = 5;
  chatbotsCount = 4;
  documentsCount = 10;

  pageTitle = 'Overview';
  pageSubtitle = "Welcome back! Here's a look at your X-Docs platform.";

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const decodedToken = this.auth.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.roles = decodedToken.scope ? decodedToken.scope.split(' ') : [];
    }

    // Keep header title in sync with the active child route
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      if (url.includes('/dashboard/chatbots')) {
        this.pageTitle = 'Chatbots';
        this.pageSubtitle = 'Manage and inspect your active chatbots.';
      } else if (url.includes('/dashboard/users')) {
        this.pageTitle = 'Users';
        this.pageSubtitle = 'Manage registered users.';
      } else {
        this.pageTitle = 'Overview';
        this.pageSubtitle = "Welcome back! Here's a look at your X-Docs platform.";
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
