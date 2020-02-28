import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {ListSessionComponent} from './list-session/list-session.component';
import {ListOperationComponent} from './list-operation/list-operation.component';
import {StartOperationComponent} from './start-operation/start-operation.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {DisplayUserDataComponent} from './display-user-data/display-user-data.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'list-operations',
    component : ListOperationComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path : 'user/:user_id',
    component : DisplayUserDataComponent
  },
  {
    path : 'list-session',
    component : ListSessionComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path : 'start-operationSession/:carte_operation_id',
    component : StartOperationComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path : 'start-operation/:operation_id/:usesession_id',
    component : StartOperationComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path : 'start-/finish-operation/:carte_operation_session_id/:quantity',
    component : StartOperationComponent,
    canActivate: [
      AuthGuardService
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
