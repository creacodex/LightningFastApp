import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersService } from './service/users.service';
import { PipesModule } from '../core/pipes/pipes.module';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    
  ]
})
export class UsersModule { }
