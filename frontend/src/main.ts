import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Make sure this is imported
import { RouterModule, Routes } from '@angular/router';

// Importing components
import { AppComponent } from '../app/app.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { LineChartComponent } from 'app/components/line-chart/line-chart.component';
import { TableComponent } from 'app/components/table/table.component';
import { DateDisplayComponent } from 'app/components/date/date.component';

// Defining application routes
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'table', component: TableComponent },
  { path: "date", component: DateDisplayComponent }
];

// Bootstrapping the application
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient() // Correct way to set up HTTP client in newer versions of Angular
  ]
}).catch(err => console.error(err));