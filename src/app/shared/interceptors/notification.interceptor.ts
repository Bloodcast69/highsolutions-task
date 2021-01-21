import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const snackbarService: MatSnackBar = this.injector.get(MatSnackBar);
    const launchSnackbar: (message: string, action?: string) => void = (message: string, action: string = 'OK') => {
      snackbarService.open(message, action, {
        duration: 3000,
      });
    };
    return next.handle(request).pipe(
      finalize(() => {
        if (request.method === 'POST') {
          launchSnackbar('Data saved');
        }
      }),
      catchError((err) => {
        launchSnackbar('Something went wrong');
        return of(err);
      }));
  }
}
