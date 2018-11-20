import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  static log(msg: any): void {


  }


  static error(msg: string, obj = {}): void {

    console.error(msg, obj);

  }
}
