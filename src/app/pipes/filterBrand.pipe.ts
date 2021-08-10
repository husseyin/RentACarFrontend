import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrand',
})
export class FilterBrandPipe implements PipeTransform {
  transform(value: Brand[], filterText: string): Brand[] {
    filterText = filterText ? filterText.toLocaleLowerCase().trim() : filterText;

    return filterText
      ? value.filter(
          (p: Brand) =>
            p.name.toLocaleLowerCase().trim().indexOf(filterText) !== -1
        )
      : value;
  }
}
