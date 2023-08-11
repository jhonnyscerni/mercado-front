import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'app/core/utils/format-datepicker';
import { NoticeService } from 'app/services/notice.service';
import {Location} from '@angular/common';
import { Notice } from 'app/models/notice';

export const _DAY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-notice-my-form',
  templateUrl: './notice-my-form.component.html',
  styleUrls: ['./notice-my-form.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
]
})
export class NoticeMyFormComponent extends BaseFormComponent implements OnInit {

  edital: Notice;
  editalId: number;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private editalService: NoticeService) {
    super();
  }

  ngOnInit(): any {

    this.route.params.subscribe((params: any) => {
      const editalId = params['editalId'];
      if (editalId) {
          const edital$ = this.editalService.loadByID(editalId);
          edital$.subscribe((edital) => {
              this.updateForm(edital);
              //this.roles = usuario.roles;
              //this.carregarGrupos();
          });
      }
  });

      
      this.cadastroForm = this.fb.group({
      id: [''],
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      numero: [''],
      dataInicio: [''],
      dataFim: [''],
    });
  }

  updateForm(edital): any {
    this.cadastroForm.patchValue({
        id: edital.id,
        titulo: edital.titulo,
        numero: edital.numero,
        dataInicio: edital.dataInicio,
        dataFim: edital.dataFim
    });
}

  submit() {
    let msgSuccess = 'Edital criado com sucesso!';
    let msgError = 'Erro ao criar edital, tente novamente!';
    if (this.cadastroForm.value.id) {
        msgSuccess = 'Edital atualizado com sucesso!';
        msgError = 'Erro ao atualizar edital, tente novamente!';
    }

    this.editalService.save(this.cadastroForm.value).subscribe(
        (success) => {
            this.toastr.success(msgSuccess, 'Informação :)');
            this.location.back();
        },
        error => this.toastr.error(msgError, 'Opa :(')
    );
  }

  
  cancelar(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }

  lista(): any{
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }

}
