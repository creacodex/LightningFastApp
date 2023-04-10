import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../core/pipes/pipes.module';

import { CarrierTypeRoutingModule } from './carrier-type-routing.module';
import { CarrierTypeListComponent, NgbdSortableHeader } from './carrier-type-list/carrier-type-list.component';
import { CarrierTypeEditComponent } from './carrier-type-edit/carrier-type-edit.component';
import { CarrierTypeService } from './service/carrier-type.service';


@NgModule({
  declarations: [
    NgbdSortableHeader,
    CarrierTypeListComponent,
    CarrierTypeEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    CarrierTypeRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CarrierTypeService,
    
  ]
})
export class CarrierTypeModule { }
