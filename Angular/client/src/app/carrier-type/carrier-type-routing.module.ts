import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrierTypeListComponent } from './carrier-type-list/carrier-type-list.component';
import { CarrierTypeEditComponent } from './carrier-type-edit/carrier-type-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: CarrierTypeListComponent },
    { path: 'edit', component: CarrierTypeEditComponent },
    { path: 'edit/:id', component: CarrierTypeEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierTypeRoutingModule { }
