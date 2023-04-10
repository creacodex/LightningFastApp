import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client.model';
import { WebApiService } from 'src/app/core/service/webapi.service';

@Injectable()
export class ClientService extends WebApiService<Client> {
  constructor(protected http: HttpClient) {
    super(http, 'client');
  }
}