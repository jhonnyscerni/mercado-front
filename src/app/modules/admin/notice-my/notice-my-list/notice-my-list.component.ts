import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Notice } from 'app/models/notice';
import { NoticeService } from 'app/services/notice.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-notice-my-list',
  templateUrl: './notice-my-list.component.html',
})
export class NoticeMyListComponent implements OnInit {

  notices: Notice[];
  errorMessage: string;
  authorities: any;

  meusDados = true;

  noticeSelecionado: Notice;

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
    private alertService: AlertModalService,
    private authService: AuthService
  ) { }

  getRequestParams(pageElement, size): any {
    let numero = this.numerocontrol.value;
    const params = {};

    params['meusDados'] = true;

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
    this.authorities = this.authService.getAuthorities()[0].authority;

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

  onEdit(id): any {
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  onLeilao(id): any {
    this.router.navigate(['../', id, 'leilao',], { relativeTo: this.route });
  }

  onSaleList(id): any {
    this.router.navigate(['../', id ,'leilao', 'lista' ], { relativeTo: this.route });
  }

  onItem(id): any {
    this.router.navigate(['../adicionar-item', id ], { relativeTo: this.route });
  }


  create(): any {
    this.router.navigate(['../cadastrar'], { relativeTo: this.route });
  }

  onDelete(produto): any {
    this.noticeSelecionado = produto;
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse item?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.editalService.remove(produto.id) : EMPTY,
        ),
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
      );
  }

}
