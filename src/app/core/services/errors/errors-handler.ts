import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as StackTraceParser from 'error-stack-parser';


@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(
        private injector: Injector
    ) { }


    handleError(error: Error) {
        const router = this.injector.get(Router);
        if (!navigator.onLine){
            console.log("offline");
            router.navigate(['error'])
            
        }
        if (error instanceof ErrorEvent){
            console.log(error.message)
        }
       
    }
}
