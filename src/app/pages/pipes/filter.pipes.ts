import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'

})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[],  value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem["name"].toLowerCase().includes(value.toLowerCase()) || singleItem["status"].toLowerCase().includes(value.toLowerCase()) 
    );


    
  }
}


 