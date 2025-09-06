// File: chatyourdocs/src/app/components/login/login.ts
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
  // switched to email-based login
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private auth: Auth, private router: Router) {}

  onLogin(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (!this.auth.validateEmail(this.email.trim())) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: (response) => {
        this.auth.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);

        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (err.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please try again.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }
}
