import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(public snackbar: MatSnackBar) { }
    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                try {
                    throw new Error("offline error")
                }
                catch (e) {
                    console.log(e);
                    
                    this.snackbar.open(e, "cannot load the page", {
                        duration: 2000
                    })
                }
            } else {
                
                // Handle Http Error (error.status === 403, 404...)
                try {
                    throw new Error()
                }
                catch (e) {
                    console.log(e);
                    
                    this.snackbar.open(e, "api error", {
                        duration: 2000
                    })
                }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)  
            try {
                throw new Error()
            }
            catch (e) {
                console.log(e);
                
                this.snackbar.open(e, "unknown error", {
                    duration: 2000
                })
            }
        }
        // Log the error anyway
        // console.log("the error happened",typeof new Error());

    }
}
