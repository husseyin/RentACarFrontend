import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calculate } from '../models/calculate';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = environment.staticApi + '/rentals';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + '/getrentalbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  priceCalculate(rentD: any, returnD: any, price: number) {
    var days =
      (new Date(returnD).getTime() - new Date(rentD).getTime()) /
      (1000 * 3600 * 24);
    var total = days * price;

    var calculate = new Calculate();
    calculate.numberOfDays = days;
    calculate.totalPrice = total;

    return calculate;
  }
}
