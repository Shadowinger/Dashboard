import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component'; 
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule
    )
  ]
}).catch(err => console.error(err));