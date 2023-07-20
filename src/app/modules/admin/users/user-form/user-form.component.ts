import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'app/models/role';
import { User } from 'app/models/user';
import { RoleService } from 'app/services/role.service';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseFormComponent implements OnInit {

    user: User;
    userId: number;
    grupos = [];

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        private router: Router,
        private grupoService: RoleService,
        private toastr: ToastrService,
        private _authService: AuthService
    ) {
        super();
    }

    ngOnInit(): any {

        this.route.params.subscribe((params: any) => {
            const idUsuario = params['userId'];
            if (idUsuario) {
                const usuario$ = this.usuarioService.loadByID(idUsuario);
                usuario$.subscribe((usuario) => {
                    this.updateForm(usuario);
                    //this.roles = usuario.roles;
                    //this.carregarGrupos();
                });
            }
        });

        this.carregarGrupos();

        this.cadastroForm = this.fb.group({
            id: [''],
            username: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250),
                ],
            ],
            email: [
                '',
                [Validators.required, Validators.email],
            ],
            telefone: ['', [Validators.required]],
            password: ['', [Validators.required]],
            grupos: [''],
        });

    }

    updateForm(user): any {
        this.cadastroForm.patchValue({
            id: user.id,
            username: user.username,
            email: user.email,
            telefone: user.telefone,
            password: user.password,
            grupos: user.grupos,
            empresa:user.empresa
        });
    }

    submit(): any {
        let msgSuccess = 'Usuário criado com sucesso!';
        let msgError = 'Erro ao criar usuario, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Usuário atualizado com sucesso!';
            msgError = 'Erro ao atualizar usuario, tente novamente!';
        }

        this.usuarioService.save(this.cadastroForm.value).subscribe(
            (success) => {
                this.toastr.success(msgSuccess, 'Informação :)');
                this.location.back();
            },
            error => this.toastr.error(msgError, 'Opa :(')
        );
    }

    cancelar(): any {
        this.router.navigate(['/usuarios'], {relativeTo: this.route});
    }

    resetar(): any {
        this.cadastroForm.reset();
      }


    listaUsuario(): any {
        this.router.navigate(['/usuarios'], {relativeTo: this.route});
    }

    carregarGrupos(): any {
         return this.grupoService.list()
            .subscribe((grupos) => {
                grupos.forEach((element) => {
                     if (!(this._authService.getAuthorities()[0].authority === 'ROLE_SUPER_ADMIN') &&
                     (element.nome !== 'ROLE_SUPER_ADMIN' && element.nome !== 'ROLE_ADMIN')){
                        this.grupos.push(element);
                     }else if (this._authService.getAuthorities()[0].authority === 'ROLE_SUPER_ADMIN') {
                        this.grupos.push(element);
                     }
                });
            });
    }

    compareFn(compared1: { id: number }, compared2: { id: number }): any {
        return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
    }
}
