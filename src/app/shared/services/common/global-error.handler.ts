import {ErrorHandler, Injectable, Injector} from '@angular/core'
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LoggerService {
  log(error) {
    console.log("Logger", error);
  }
}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  
    constructor(private logger: LoggerService, private injector: Injector) { 
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        super(true);
    }
    
    handleError(error) {
        this.logger.log(error);

        this.snackBar.open(`Произошла ошибка: ${error.message}`, null, {
            extraClasses: ['snack-bar-error'],
            duration: 10000,
            horizontalPosition: 'right'
        });
    }

    public get snackBar(): MatSnackBar {
        return this.injector.get(MatSnackBar);
    }

}