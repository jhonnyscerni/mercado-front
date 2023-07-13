import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseService} from '../services/base.service';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';
import {UsuarioLogin} from '../../models/dto/login';
import {UsuarioRecuperarSenha} from '../../models/dto/usuario-recuperar-senha';

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {


    apiURL: string = environment.urlbase + '/mercado/auth';
    apiURLRegister: string = this.apiURL + '/signup';
    jwtHelper: JwtHelperService = new JwtHelperService();

    private _authenticated: boolean = false;

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Save Token
     */
    public saveToken(token: any): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token.token);
    }
    /**
     * Get Token
     */
    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Sub
     */
    public getUserId(): any {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token).sub;
        }
        return null;
    }

    /**
     * Iss
     */
    public getUserName(): any {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token).iss;
        }
        return null;
    }

    /**
     * Authorities
     */
    public getAuthorities(): any {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token).authorities;
        }
        return null;
    }

    /**
     * Verify if Authenticated
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token);
            return !expired;
        }
        return false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ methods User Storage
    // -----------------------------------------------------------------------------------------------------

    public saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param usuarioLogin
     */
    signIn(usuarioLogin: UsuarioLogin): Observable<any> {

        return this.http
            .post(this.apiURL + '/login',
                usuarioLogin, {headers})
            .pipe(
                switchMap((response: any) => {

                    // Store the access token in the local storage
                    this.saveToken(response);

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem(TOKEN_KEY);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign Up
     *
     * @param usuario
     */
    signUp(tipoUsuario: any, usuario: User): Observable<any> {
        const params = new HttpParams().set('tipoUsuario', tipoUsuario);
        return this.http.post<any>(this.apiURLRegister, usuario, {params});
    }

    /**
     * Forgot password
     *
     * @param record
     */
    forgotPassword(email: string): Observable<UsuarioRecuperarSenha> {

        return this.http.get<any>(`${this.apiURL}/resetpassword/${email}`);
    }


}
