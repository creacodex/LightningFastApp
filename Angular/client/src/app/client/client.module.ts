import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../core/pipes/pipes.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent, NgbdSortableHeader } from './client-list/client-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientService } from './service/client.service';


@NgModule({
  declarations: [
    NgbdSortableHeader,
    ClientListComponent,
    ClientEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    ClientRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClientService,
    
  ]
})
export class ClientModule { }
