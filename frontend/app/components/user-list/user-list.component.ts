import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id?: number;
  lastName?: string;
  firstName?: string;
  status?: string;
  phone?: string;
}

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private dataInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    this.dataInterval = setInterval(() => {
      this.fetchData();
    }, 5000);
  }

  fetchData() {
    this.http.get<{ Users: User[] }>('assets/data.json').subscribe({
      next: data => {
        if (data.Users && Array.isArray(data.Users)) {
          this.users = data.Users.map(user => ({
            id: user.id ?? null,
            lastName: user.lastName || 'Neznámý',
            firstName: user.firstName || '',
            status: user.status || 'unknown',
            phone: user.phone || 'Telefon není k dispozici'
          }));
        } else {
          console.error('Invalid data format:', data);
          this.setDefaultUsers();
        }
        console.log(this.users);
      },
      error: err => {
        console.error('Failed to load user data:', err);
        this.setDefaultUsers();
      }
    });
  }

  setDefaultUsers() {
    this.users = [
      { id: 0, lastName: 'Neznámý', firstName: '', status: 'unknown', phone: 'Telefon není k dispozici' }
    ];
  }

  ngOnDestroy() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
  }
}