import { ChartComponent } from './components/chart/chart.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TableComponent } from "./components/table/table.component";
import { DateDisplayComponent } from './components/date/date.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DashboardComponent, UserListComponent, UserFormComponent, ChartComponent, LineChartComponent, TableComponent, DateDisplayComponent] // Přidání komponent do imports
})
export class AppComponent { }