import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './authentication/service/authorize.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home', component: DashboardComponent,
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'carrier-type',
    loadChildren: () => import('./carrier-type/carrier-type.module').then(m => m.CarrierTypeModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  {
    path: 'shipping-type',
    loadChildren: () => import('./shipping-type/shipping-type.module').then(m => m.ShippingTypeModule),
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

