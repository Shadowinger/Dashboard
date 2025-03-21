import { ChartComponent } from './../app/components/chart/chart.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component'; 
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { LineChartComponent } from 'app/components/line-chart/line-chart.component';
import { Chart } from 'chart.js';
import { AfterViewInit } from "@angular/core";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: "", component: UserFormComponent},
  { path: "", component: LineChartComponent},
  { path: "", component: ChartComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule
    )
  ]
}).catch(err => console.error(err));