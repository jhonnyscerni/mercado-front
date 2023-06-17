import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'app/models/role';
import { RoleService } from 'app/services/role.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent extends BaseFormComponent implements OnInit {

    grupo: Role;
    idGrupo: number;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertModalService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private grupoService: RoleService,
        private toastr: ToastrService,
      ) {
        super();
      }

      ngOnInit(): any {
        this.route.params.subscribe((params: any) => {
          const idGrupo = params['idGrupo'];
          if (idGrupo) {
            //console.log(idGrupo);
            const grupo$ = this.grupoService.loadByID(idGrupo);
            grupo$.subscribe((grupo) => {
              this.updateForm(grupo);
              // this.cadastroForm.setValue(evento)
            });
          }
        });
            this.cadastroForm = this.fb.group({
          id: [''],
          nome: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(250),
            ],
          ]
        });
      }

      updateForm(grupo): any {
        this.cadastroForm.patchValue({
          id: grupo.id,
          nome: grupo.nome
        });
      }

      submit(): any {
        //console.log('submit');

        let msgSuccess = 'Grupo criado com sucesso!';
        let msgError = 'Erro ao criar grupo, tente novamente!';
        if (this.cadastroForm.value.id) {
          //console.log(this.cadastroForm.value);
          msgSuccess = 'Grupo atualizado com sucesso!';
          msgError = 'Erro ao atualizar grupo, tente novamente!';
        }

        this.grupoService.save(this.cadastroForm.value).subscribe(
          (success) => {
            //this.toastr.success(msgSuccess, 'Sucesso'),
            // this.alertService.showAlertSuccess(msgSuccess);
            this.toastr.success(msgSuccess, 'Informação :)');
            this.location.back();
          },
          error =>
          //this.alertService.showAlertDanger(msgError),
          this.toastr.error(msgError, 'Opa :(')
        );
      }

      cancelar(): any {
        this.router.navigate(['/grupos/lista'], { relativeTo: this.route });
      }

      listaGrupos(): any{
        this.router.navigate(['/grupos/lista'], { relativeTo: this.route });
      }

}
