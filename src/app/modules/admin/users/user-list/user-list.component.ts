import { UsuarioService } from './../../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
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
        private fb: FormBuilder
    ) {}

    getRequestParams(pageElement, size) {
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

    ngOnInit() {

        this.usernamecontrol = this.fb.control('');
        this.emailControl = this.fb.control('');
        this.searchForm = this.fb.group({
          usernamecontrol: this.usernamecontrol,
          emailControl: this.emailControl
        });
        this.onRefresh();
      }

      handlePageChange(event) {
        this.page = event;
        this.pageElement = this.page - 1;
        this.onRefresh();
      }

      onRefresh() {
        const params = this.getRequestParams(this.pageElement, this.size);

        this.usuarioService.listSearchPage(params)
          .subscribe(
            users => {
              this.users = users.content;
              this.totalElements = users.totalElements;
              this.pageElement = users.number;
              this.size = users.size;
            },
            error => this.errorMessage
          );
      }

      onSearch() {
        this.totalElements = 0;
        this.page = 1;
        this.pageElement = 0;
        this.size = 10;
        this.onRefresh();
      }

      onEdit(id) {
        this.router.navigate(['/usuarios/editar', id], { relativeTo: this.route });
      }

}
