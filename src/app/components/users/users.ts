// src/app/components/users/users.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Auth, UserDto } from '../../services/auth';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {
  users: UserDto[] = [];
  error: string | null = null; // ✅ Declare the error variable

  constructor(
    private authService: Auth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.getUsers().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Failed to fetch users:', err);
        }
      });
    }
  }
}
