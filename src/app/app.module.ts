import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { LoginComponent } from './login/login.component';
import {CookieModule} from 'ngx-cookie';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {LoginService} from './services/login.service';
import {ListsessionService} from './services/listsession.service';
import { HttpClientModule } from '@angular/common/http';
import { ListSessionComponent } from './list-session/list-session.component';
import { LogoutComponent } from './logout/logout.component';
import { ListOperationComponent } from './list-operation/list-operation.component';
import { StartOperationComponent } from './start-operation/start-operation.component';
import {UserService} from './services/user.service';
import {ProgressBarModule} from 'angular-progress-bar';
import {AuthGuardService} from './services/auth-guard.service';
import {ModalComponent} from './shared/components/modal/ModalComponent';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    LoginComponent,
    WelcomePageComponent,
    ListSessionComponent,
    LogoutComponent,
    ListOperationComponent,
    StartOperationComponent,
    ModalComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    ProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
}
      }
    })
  ],
  providers: [
    UserService,
    LoginService,
    ListsessionService,
    AuthGuardService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
