import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DashboardComponent, UserListComponent] // Přidání komponent do imports
})
export class AppComponent { }