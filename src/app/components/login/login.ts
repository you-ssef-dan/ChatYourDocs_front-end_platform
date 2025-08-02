  // chatyourdocs/src/app/components/login/login.ts

  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Router, RouterModule } from '@angular/router';
  import { Auth } from '../../services/auth';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
  })
  export class Login {
    username: string = '';
    password: string = '';

    constructor(private auth: Auth, private router: Router) {}

    onLogin(): void {
      this.auth.login(this.username, this.password).subscribe({
        next: (response) => {
          this.auth.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
