import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id?: number;
  lastName: string;
  firstName?: string;
  status?: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule]
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private dataInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    this.dataInterval = setInterval(() => {
      this.fetchData();
    }, 30000); // Update every 30 seconds
  }

  ngOnDestroy() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
  }

  fetchData() {
    this.http.get<{ Users: User[] }>('assets/data.json').subscribe({
      next: data => {
        if (data.Users && Array.isArray(data.Users)) {
          this.users = data.Users;
        } else {
          console.error('Invalid data format:', data);
          this.setDefaultUsers();
        }
      },
      error: err => {
        console.error('Failed to load user data:', err);
        this.setDefaultUsers();
      }
    });
  }

  setDefaultUsers() {
    this.users = [
      { id: 0, lastName: 'Neznámý', firstName: 'Uživatel', status: 'away', phone: '000000000' }
    ];
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-away';
    
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available';
      case 'busy':
        return 'status-busy';
      case 'away':
        return 'status-away';
      case 'offline':
        return 'status-offline';
      default:
        return 'status-away';
    }
  }

  getInitials(user: User): string {
    if (user.lastName && user.lastName.length > 0) {
      if (user.firstName && user.firstName.length > 0) {
        return user.lastName.charAt(0) + user.firstName.charAt(0);
      }
      return user.lastName.charAt(0);
    }
    return '?';
  }
}