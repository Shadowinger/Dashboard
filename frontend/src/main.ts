import { ChartComponent } from './../app/components/chart/chart.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Make sure this is imported
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { LineChartComponent } from 'app/components/line-chart/line-chart.component';
import { Chart } from 'chart.js';
import { AfterViewInit } from "@angular/core";
import { TableComponent } from 'app/components/table/table.component';
import { DateDisplayComponent } from 'app/components/date/date.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'table', component: TableComponent },
  { path: "date", component: DateDisplayComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient() // Correct way to set up HTTP client in newer versions of Angular
  ]
}).catch(err => console.error(err));