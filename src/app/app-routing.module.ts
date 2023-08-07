import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { InfoComponent } from './user/info/info.component';
import { DashComponent } from './monster/dash/dash.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'user/info',
    component: InfoComponent,
    canActivate: [],
  },
  {
    path: 'monsters',
    component: DashComponent,
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
