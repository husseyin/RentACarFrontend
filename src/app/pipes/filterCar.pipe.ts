import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car-detail';

@Pipe({
  name: 'filterCar',
})
export class FilterCarPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase().trim() : filterText;

    return filterText
      ? value.filter(
          (p: CarDetail) =>
            p.carName.toLocaleLowerCase().trim().indexOf(filterText) !== -1
        )
      : value;
  }
}
