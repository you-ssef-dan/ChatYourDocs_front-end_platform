// src/app/components/dashboard/dashboard.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, OnDestroy {
  username: string = '';
  roles: string[] = [];

  // dynamic values previously passed to the Overview child
  usersCount = 5;
  chatbotsCount = 4;
  documentsCount = 10;

  pageTitle = 'Overview';
  pageSubtitle = "Welcome back! Here's a look at your X-Docs platform.";

  // show the inlined overview or let the router render child components
  showOverview = true;

  private routerSub?: Subscription;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const decodedToken = this.auth.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.roles = decodedToken.scope ? decodedToken.scope.split(' ') : [];
    }

    // initial state (in case navigation hasn't fired yet)
    const initialUrl = this.router.url;
    this.updateViewFromUrl(initialUrl);

    // Keep header title & showOverview in sync with the active child route
    this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.updateViewFromUrl(url);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private updateViewFromUrl(url: string) {
    if (url.includes('/dashboard/chatbots')) {
      this.pageTitle = 'Chatbots';
      this.pageSubtitle = 'Manage and inspect your active chatbots.';
      this.showOverview = false;
    } else if (url.includes('/dashboard/users')) {
      this.pageTitle = 'Users';
      this.pageSubtitle = 'Manage registered users.';
      this.showOverview = false;
    } else {
      // treat /dashboard and /dashboard/overview (and any other default) as overview
      this.pageTitle = 'Overview';
      this.pageSubtitle = "Welcome back! Here's a look at your X-Docs platform.";
      this.showOverview = url === '/dashboard' || url === '/dashboard/' || url.includes('/dashboard/overview') || !url.includes('/dashboard/');
      // the last fallback ensures overview displays when no child is activated
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
