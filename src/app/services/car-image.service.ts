import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/car-image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private apiUrl = environment.staticApi + '/carimages';

  constructor(private httpClient: HttpClient) {}

  getImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + '/getimagesbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
