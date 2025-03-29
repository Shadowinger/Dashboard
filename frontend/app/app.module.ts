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


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'table', component: TableComponent },
  { path: "date", component: DateDisplayComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    DashboardComponent,
    UserListComponent,
    UserFormComponent,
    ChartComponent,
    LineChartComponent,
    TableComponent,
    DateDisplayComponent
    
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }