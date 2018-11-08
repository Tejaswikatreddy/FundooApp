import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify([item.title, item.description, item.noteLabels.label]).toLowerCase().includes(args);
      // var val= (item.title.toLowerCase().indexOf(args.toLowerCase())>-1) ||
      //  (item.description.toLowerCase().indexOf(args.toLowerCase()) > -1) ;
      //   (item.noteLabels.label.toLowerCase().indexOf(args.toLowerCase()) > -1);
       
      // return val;
    });
  }
  }


