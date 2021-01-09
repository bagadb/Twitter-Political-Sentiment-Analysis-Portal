import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: 'portal', component: UserPageComponent},
  { path: 'portal/:username', component: UserPageComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
