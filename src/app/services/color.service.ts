import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = environment.staticApi + '/colors';

  constructor(private httClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + '/getall';
    return this.httClient.get<ListResponseModel<Color>>(newPath);
  }
}
