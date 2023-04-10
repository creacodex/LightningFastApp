import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../core/pipes/pipes.module';

import { ShippingTypeRoutingModule } from './shipping-type-routing.module';
import { ShippingTypeListComponent, NgbdSortableHeader } from './shipping-type-list/shipping-type-list.component';
import { ShippingTypeEditComponent } from './shipping-type-edit/shipping-type-edit.component';
import { ShippingTypeService } from './service/shipping-type.service';


@NgModule({
  declarations: [
    NgbdSortableHeader,
    ShippingTypeListComponent,
    ShippingTypeEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    ShippingTypeRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ShippingTypeService,
    
  ]
})
export class ShippingTypeModule { }
