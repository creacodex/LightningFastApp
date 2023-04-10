import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarrierType } from '../model/carrier-type.model';
import { WebApiService } from 'src/app/core/service/webapi.service';

@Injectable()
export class CarrierTypeService extends WebApiService<CarrierType> {
  constructor(protected http: HttpClient) {
    super(http, 'carriertype');
  }
}