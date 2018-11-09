import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelSearch'
})
export class LabelSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
