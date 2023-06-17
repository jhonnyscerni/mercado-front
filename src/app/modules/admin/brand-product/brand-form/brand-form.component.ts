import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'app/models/brand';
import { RoleService } from 'app/services/role.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { BrandService } from 'app/services/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent extends BaseFormComponent implements OnInit {
    marca: Brand;
    idMarca: number;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private marcaService: BrandService,
        private toastr: ToastrService,
      ) {
        super();
      }

      ngOnInit(): any {
        this.route.params.subscribe((params: any) => {
          const idMarca = params['idMarca'];
          if (idMarca) {
            console.log(idMarca);
            const marca$ = this.marcaService.loadByID(idMarca);
            marca$.subscribe((marca) => {
              this.updateForm(marca);
              console.log(marca);
            });
          }
        });
            this.cadastroForm = this.fb.group({
          id: [''],
          nomeDesc: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(250),
            ],
          ]
        });
      }

      updateForm(marca): any {
        this.cadastroForm.patchValue({
          id: marca.id,
          nomeDesc: marca.nomeDesc
        });
      }

      submit(): any {
        //console.log('submit');

        let msgSuccess = 'marca criado com sucesso!';
        let msgError = 'Erro ao criar marca, tente novamente!';
        if (this.cadastroForm.value.id) {
          //console.log(this.cadastroForm.value);
          msgSuccess = 'marca atualizado com sucesso!';
          msgError = 'Erro ao atualizar marca, tente novamente!';
        }

        this.marcaService.save(this.cadastroForm.value).subscribe(
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
        this.router.navigate(['/marca-produtos/lista'], { relativeTo: this.route });
      }

      listaMarcas(): any{
        this.router.navigate(['/marca-produtos/lista'], { relativeTo: this.route });
      }
    }
