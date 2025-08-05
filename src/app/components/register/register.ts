// src/app/components/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth as AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  role = 'USER';
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.username.trim() || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({
      username: this.username.trim(),
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error', err);
        this.isLoading = false;

        if (err.status === 409) {
          this.errorMessage = 'Username already exists';
        } else if (err.status === 0) {
          this.errorMessage = 'Unable to connect to server';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }
}

