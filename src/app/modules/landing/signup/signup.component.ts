import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Role } from 'app/models/role';
import { User } from 'app/models/user';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
    selector: 'landing-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingSignupComponent extends BaseFormComponent implements OnInit {

    test: Date = new Date();
    public isCollapsed = true;
    user: User;
    userId: number;
    roles: Role[];
    userAuth: any;

    tipoUsuario = 'USER';

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toastr: ToastrService,
    ) { super(); }

    ngOnInit(): any {


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
            roles: [''],
            empresa: this.fb.group({
                razaoSocial: ['', Validators.required],
                nomeFantasia: ['', Validators.required],
                cnpj: ['', Validators.required],
                inscEstadual: ['', Validators.required],
                inscMunicipal: ['', Validators.required],
                categoria: [''],
                email: [
                    '',
                    [Validators.required, Validators.email]
                ],
                telefone: [''],
                endereco: this.fb.group({
                    cep: ['', Validators.required],
                    ruaLogra: ['', Validators.required],
                    numero: ['', Validators.required],
                    complemento: ['', Validators.required],
                    bairro: ['', Validators.required],
                    cidade: ['', Validators.required],
                    estado: ['', Validators.required]
                })
            }),
        });

    }

    submit(): any {
        const msgSuccess = 'Usuário criado com sucesso!';
        const msgError = 'Erro ao criar usuario, tente novamente!';
        console.log(this.tipoUsuario);
        if (this.tipoUsuario === 'VENDEDOR') {
            this.authService.signUp(this.tipoUsuario, this.cadastroForm.value).subscribe(
                (success) => {
                    this.toastr.success(msgSuccess, 'Informação :)');
                    this.location.back();
                },
                error => this.toastr.error(msgError, 'Opa :(')
            );
        }

        if (this.tipoUsuario === 'COMPRADOR') {
            this.authService.signUp(this.tipoUsuario, this.cadastroForm.value).subscribe(
                (success) => {
                    this.toastr.success(msgSuccess, 'Informação :)');
                    this.location.back();
                },
                error => this.toastr.error(msgError, 'Opa :(')
            );
        }
    }

    cancelar(): any {
        this.router.navigate(['/home'], { relativeTo: this.route });
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

    doSomething(event): any {
        this.tipoUsuario = event;
    }
}
