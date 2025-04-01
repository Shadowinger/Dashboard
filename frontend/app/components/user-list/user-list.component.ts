import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define the User interface to represent user data structure
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
  // Array to hold the list of users
  users: User[] = [];
  private dataInterval: any;

  constructor(private http: HttpClient) {}

  // Lifecycle hook that is called after the component is initialized
  ngOnInit() {
    this.fetchData(); // Initially fetch user data
    // Set up an interval to fetch data every 30 seconds
    this.dataInterval = setInterval(() => {
      this.fetchData();
    }, 30000); // Update every 30 seconds
  }

  // Lifecycle hook that is called just before the component is destroyed
  ngOnDestroy() {
    // Clear the interval to prevent memory leaks
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
  }

  // Fetch user data from the JSON file
  fetchData() {
    this.http.get<{ Users: User[] }>('assets/data.json').subscribe({
      next: data => {
        // Check if the data format is valid
        if (data.Users && Array.isArray(data.Users)) {
          this.users = data.Users; // Update users with fetched data
        } else {
          console.error('Invalid data format:', data);
          this.setDefaultUsers(); // Set default users if data is invalid
        }
      },
      error: err => {
        console.error('Failed to load user data:', err);
        this.setDefaultUsers(); // Set default users on error
      }
    });
  }

  // Set default user data in case of failure or invalid data
  setDefaultUsers() {
    this.users = [
      { id: 0, lastName: 'Neznámý', firstName: 'Uživatel', status: 'away', phone: '000000000' }
    ];
  }

  // Get the CSS class based on the user's status
  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-away'; // Default to away if no status
    
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
        return 'status-away'; // Default to away for unknown statuses
    }
  }

  // Get the initials of the user based on their name
  getInitials(user: User): string {
    if (user.lastName && user.lastName.length > 0) {
      if (user.firstName && user.firstName.length > 0) {
        return user.lastName.charAt(0) + user.firstName.charAt(0); // Combine initials
      }
      return user.lastName.charAt(0); // Return last name initial
    }
    return '?'; // Return '?' if no name is available
  }
}