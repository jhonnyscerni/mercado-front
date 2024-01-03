import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Notice } from 'app/models/notice';
import { NoticeService } from 'app/services/notice.service';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class LandingHomeComponent implements OnInit
{
    test: Date = new Date();
    notices: Notice[];
    errorMessage: string;
    isCollapsed = true;
    user: any;

    searchForm: FormGroup;
    numerocontrol: FormControl;


     // Paginação
     totalElements = 0;
     page = 1;
     pageElement = 0;
     size = 10;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private editalService: NoticeService,
      private fb: FormBuilder,
      private authService: AuthService,
    ) { }

    getRequestParams(pageElement, size): any {
      let numero = this.numerocontrol.value;
      const params = {};

      if (pageElement) {
          params['page'] = pageElement;
      }

      if (size) {
          params['size'] = size;
      }

      if (numero && (numero = numero.trim()) !== '') {
          params['numero'] = numero;
      }
      return params;
  }

    ngOnInit(): any {

        this.numerocontrol = this.fb.control('');
        this.searchForm = this.fb.group({
            numerocontrol: this.numerocontrol
        });
        this.onRefresh();
     }

     handlePageChange(event): any {
      this.page = event;
      this.pageElement = this.page - 1;
      this.onRefresh();
  }

  onRefresh(): any {
    const params = this.getRequestParams(this.pageElement, this.size);

    this.editalService.listSearchPage(params)
      .subscribe(
        (notice) => {
          console.log(notice)
          this.notices = notice.content;
          this.totalElements = notice.totalElements;
          this.pageElement = notice.number;
          this.size = notice.size;
        },
        error => this.errorMessage
      );
  }

  onSearch(): any {
    this.totalElements = 0;
    this.page = 1;
    this.pageElement = 0;
    this.size = 10;
    this.onRefresh();
}
    

    usuarioLogado(): boolean {
      this.user = this.authService.getUserName();
      return this.authService.isAuthenticated();
    }

    logout(): any {
      this.authService.signOut();
      this.router.navigate(['/']);
    }

    onDashboard(): any {
      this.router.navigate(['/usuarios/lista']);
    }

    onEdit(id): any {
      this.router.navigate(['../editar', id], { relativeTo: this.route });
    }
}