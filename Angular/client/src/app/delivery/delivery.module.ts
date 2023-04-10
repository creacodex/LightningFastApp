import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../core/pipes/pipes.module';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryListComponent, NgbdSortableHeader } from './delivery-list/delivery-list.component';
import { DeliveryEditComponent } from './delivery-edit/delivery-edit.component';
import { DeliveryService } from './service/delivery.service';
import { ShippingTypeService } from '../shipping-type/service/shipping-type.service';
import { CarrierTypeService } from '../carrier-type/service/carrier-type.service';

@NgModule({
  declarations: [
    NgbdSortableHeader,
    DeliveryListComponent,
    DeliveryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    DeliveryRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    DeliveryService,
    ShippingTypeService,
    CarrierTypeService,
  ]
})
export class DeliveryModule { }
