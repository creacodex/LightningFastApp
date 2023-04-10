import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../model/delivery.model';
import { WebApiService } from 'src/app/core/service/webapi.service';

@Injectable()
export class DeliveryService extends WebApiService<Delivery> {
  constructor(protected http: HttpClient) {
    super(http, 'delivery');
  }
}