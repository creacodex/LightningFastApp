import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebApiService } from 'src/app/core/service/webapi.service';
import { UserProfile } from '../model/user-profile.model';

@Injectable()
export class UserProfileService extends WebApiService<UserProfile> {
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }
}
