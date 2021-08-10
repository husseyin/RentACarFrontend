import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customer-detail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = environment.staticApi + '/customers';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + '/getcustomerdetails';
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerDetailByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CustomerDetail>> {
    let newPath =
      this.apiUrl + '/getcustomerdetailbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }
}
