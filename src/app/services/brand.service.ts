import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = environment.staticApi + '/brands';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
