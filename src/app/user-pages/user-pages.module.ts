import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { UserlistComponent } from './userlist/userlist.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPagesService } from './user-pages.service';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'usersetting', component: UsersettingsComponent },
  { path: 'userlist/usernew', component: UserFormComponent },
  { path: 'userlist/user-detail/:id', component: UserFormComponent },
  { path: 'usernew', component: UserFormComponent },
];


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UserlistComponent,
    UsersettingsComponent,
    UserDetailComponent,
    UserFormComponent],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  // All services
  providers: [
    UserPagesService
  ]
})
export class UserPagesModule { }
