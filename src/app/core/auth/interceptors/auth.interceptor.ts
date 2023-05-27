import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import { AuthUtils } from '../auth.utils';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /**
     * Constructor
     */
    constructor(private _authService: AuthService) { }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();
        if ( this._authService.getToken() && !AuthUtils.isTokenExpired(this._authService.getToken()) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.getToken())
            });
        }

        return next.handle(newReq);
    }
}
