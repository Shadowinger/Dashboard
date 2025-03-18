import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [UserListComponent] // Přidání UserListComponent do imports
 // Přidání UserListComponent do imports
})
export class DashboardComponent { }