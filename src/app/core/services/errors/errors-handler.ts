import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as StackTraceParser from 'error-stack-parser';


@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(
        private injector: Injector,
    ) { }


    handleError(error: Error) {
        // Do whatever you like with the error (send it to the server?)
        // And log it to the console
        console.error('It happens: ', error);
    }
}
