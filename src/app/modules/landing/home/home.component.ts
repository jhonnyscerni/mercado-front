import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit
{
    test: Date = new Date();
    isCollapsed = true;
    user: any;
    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

    ngOnInit(): any { }

    usuarioLogado(): boolean {
      this.user = this.authService.getUserName();
      return this.authService.isAuthenticated();
    }

    logout(): any {
      this.authService.signOut();
      this.router.navigate(['/home']);
    }
}
