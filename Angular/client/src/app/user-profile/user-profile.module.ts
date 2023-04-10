import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileService } from './service/user-profile.service';
import { PipesModule } from '../core/pipes/pipes.module';


@NgModule({
  declarations: [
    UserProfileEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipesModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserProfileService,
  ]
})
export class UserProfileModule { }
