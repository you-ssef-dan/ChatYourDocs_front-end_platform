// chatyourdocs/src/app/components/dashboard/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterModule } from '@angular/router';


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

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    const decodedToken = this.auth.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.roles = decodedToken.scope ? decodedToken.scope.split(' ') : [];
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
