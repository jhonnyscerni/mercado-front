import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((err) => {

            if (err instanceof HttpErrorResponse) {

                if (err.status === 401) {
                    this.router.navigate(['/sign-in'], {queryParams: {returnUrl: this.router.url}});
                }
                if (err.status === 403) {
                    this.router.navigate(['/painel/acesso-negado']);
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

}
