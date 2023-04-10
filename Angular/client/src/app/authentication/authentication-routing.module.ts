import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmInvitationComponent } from './confirm-invitation/confirm-invitation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthorizeGuard } from './service/authorize.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'invite', component: InviteComponent,
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  { path: 'confirm-invitation', component: ConfirmInvitationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
