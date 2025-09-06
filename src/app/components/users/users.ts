// src/app/components/users/users.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Auth, UserDto } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {
  users: UserDto[] = [];
  error: string | null = null;
  isAdmin = false;  // ✅ Track current user role

  constructor(
    private authService: Auth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
decodedId: number | null = null;

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const decoded = this.authService.getDecodedToken();
    if (decoded) {
      this.decodedId = Number(decoded.uid); // store current user ID
      if (decoded.scope) {
        const scopes = decoded.scope.split(' ');
        this.isAdmin = scopes.includes('ADMIN');
      }
    }
    this.loadUsers();
  }
}

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.error = 'Failed to fetch users';
      }
    });
  }

deleteUser(id: number): void {
  if (!this.isAdmin) {
    alert('You are not authorized to delete users.');
    return;
  }

  if (this.decodedId === id) {
    alert('You cannot delete yourself.');
    return;
  }

  if (!confirm('Are you sure you want to delete this user?')) return;

  this.authService.deleteUser(id).subscribe({
    next: () => {
      this.users = this.users.filter(user => user.id !== id);
    },
    error: (err) => {
      console.error('Failed to delete user:', err);
      this.error = 'Failed to delete user';
    }
  });
}

}
