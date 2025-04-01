import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ChartComponent } from './components/chart/chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TableComponent } from './components/table/table.component';
import { DateDisplayComponent } from './components/date/date.component';

// Define application routes
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'table', component: TableComponent },
  { path: "date", component: DateDisplayComponent }
];

@NgModule({
  imports: [
    BrowserModule, // Required for browser-based applications
    FormsModule, // For handling forms in the application
    RouterModule.forRoot(routes), // Set up routing for the application
    AppComponent, // Main application component
    DashboardComponent, // Dashboard component
    UserListComponent, // Component to display user list
    UserFormComponent, // Component for user form
    ChartComponent, // Base chart component
    LineChartComponent, // Line chart component
    TableComponent, // Table component for displaying data
    DateDisplayComponent // Component for displaying dates
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // Set up HTTP client with interceptors
  ]
})
export class AppModule { }