import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShippingType } from '../model/shipping-type.model';
import { WebApiService } from 'src/app/core/service/webapi.service';

@Injectable()
export class ShippingTypeService extends WebApiService<ShippingType> {
  constructor(protected http: HttpClient) {
    super(http, 'shippingtype');
  }
}