import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InviteComponent } from './invite/invite.component';
import { ConfirmInvitationComponent } from './confirm-invitation/confirm-invitation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    ResetPasswordComponent,
    RegisterComponent,
    InviteComponent,
    ConfirmInvitationComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
