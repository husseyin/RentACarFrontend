import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/car-detail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = environment.staticApi + '/cars';

  constructor(private httpClient: HttpClient) {}
  
  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(
    carId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/getcardetailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/getcardetailsbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + '/getcardetailsbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrandAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + '/getcardetailsbybrandandcolorid?brandId=' + brandId + '&' + 'colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
