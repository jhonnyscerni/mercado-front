import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';import { AuthService } from '../auth/auth.service';
;

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesGuard implements CanActivate {

  public namesAuthorities: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const authorities = this.authService.getAuthorities();
      //console.log(authorities);

      // Transformando o authorities em outra Lista so com os nomes
      for (const i of authorities) {
          this.namesAuthorities.push(i.authority);
      }

      const authorized: any = next.data[0];
      const authorized1: any = next.data[1];

      if (authorized !== undefined) {
        if(!this.namesAuthorities){
          this.navegarAcessoNegado();
        }

        const userAuthorities = this.namesAuthorities.find(x => x === authorized || x === authorized1 );

        if(!userAuthorities){
            this.navegarAcessoNegado();
        }
       //console.log("userAuthorities" + userAuthorities);
      }

      return true;
  }


  private navegarAcessoNegado() {
    this.router.navigate(['/painel/acesso-negado']);
}

}
