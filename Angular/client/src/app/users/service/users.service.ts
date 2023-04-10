import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../model/users.model';
import { WebApiService } from 'src/app/core/service/webapi.service';

@Injectable()
export class UsersService extends WebApiService<Users> {
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }
}