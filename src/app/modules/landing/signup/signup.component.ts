import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Role } from 'app/models/role';
import { User } from 'app/models/user';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
    selector     : 'landing-signup',
    templateUrl  : './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingSignupComponent extends BaseFormComponent implements OnInit
{

    test: Date = new Date();
    public isCollapsed = true;
    user: User;
    userId: number;
    roles: Role[];
    userAuth: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toastr: ToastrService,
    ) { super();}

    ngOnInit(): any {


        this.cadastroForm = this.fb.group({
            id: [''],
            cnpj: ['', [Validators.required]],
            razaoSocial: ['', [Validators.required]],
            nomeFantasia: ['', [Validators.required]],
            inscEstadual: ['', [Validators.required]],
            telefone: ['', [Validators.required]],
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
            password: ['', [Validators.required]],
            roles: [''],
        });

    }

    submit(): any {
        let msgSuccess = 'Usuário criado com sucesso!';
        let msgError = 'Erro ao criar usuario, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Usuário atualizado com sucesso!';
            msgError = 'Erro ao atualizar usuario, tente novamente!';
        }

        this.authService.signUp(this.cadastroForm.value).subscribe(
            (success) => {
                this.toastr.success(msgSuccess, 'Informação :)');
                this.location.back();
            },
            error => this.toastr.error(msgError, 'Opa :(')
        );
    }

    cancelar(): any {
        this.router.navigate(['/home'], {relativeTo: this.route});
    }

    resetar(): any {
        this.cadastroForm.reset();
      }

    usuarioLogado(): boolean {
        this.userAuth = this.authService.getUserName();
        return this.authService.isAuthenticated();
      }

    logout(): any {
      this.authService.signOut();
      this.router.navigate(['/home']);
    }

    onDashboard(): any {
        this.router.navigate(['/project']);
    }
}
