import { UsuarioService } from './../../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    users: User[];
    errorMessage: string;

    usuarioSelecionado: User;

    searchForm: FormGroup;
    usernamecontrol: FormControl;
    emailControl: FormControl;

    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        private fb: FormBuilder,
        private alertService: AlertModalService,
    ) {}

    getRequestParams(pageElement, size): any {
        let username = this.usernamecontrol.value;
        let email = this.emailControl.value;
        const params = {};

        if (pageElement) {
            params['page'] = pageElement;
        }

        if (size) {
            params['size'] = size;
        }

        if (username && (username = username.trim()) !== '') {
            params['username'] = username;
        }

        if (email && (email = email.trim()) !== '') {
            params['email'] = email;
        }

        return params;
    }

    ngOnInit(): any {

        this.usernamecontrol = this.fb.control('');
        this.emailControl = this.fb.control('');
        this.searchForm = this.fb.group({
          usernamecontrol: this.usernamecontrol,
          emailControl: this.emailControl
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

        this.usuarioService.listSearchPage(params)
          .subscribe(
            (users) => {
              this.users = users.content;
              this.totalElements = users.totalElements;
              this.pageElement = users.number;
              this.size = users.size;
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

      create(): any {
        this.router.navigate(['../cadastrar'], { relativeTo: this.route });
      }


  onDelete(usuario): any {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse item?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.usuarioService.remove(usuario.id) : EMPTY,
        ),
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
      );
  }

}
