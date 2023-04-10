import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingTypeListComponent } from './shipping-type-list/shipping-type-list.component';
import { ShippingTypeEditComponent } from './shipping-type-edit/shipping-type-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ShippingTypeListComponent },
    { path: 'edit', component: ShippingTypeEditComponent },
    { path: 'edit/:id', component: ShippingTypeEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingTypeRoutingModule { }
