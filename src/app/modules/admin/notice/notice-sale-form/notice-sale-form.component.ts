import { NoticeService } from './../../../../services/notice.service';
import { NoticeSaleService } from './../../../../services/notice-sale.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Notice } from 'app/models/notice';

@Component({
  selector: 'app-notice-sale-form',
  templateUrl: './notice-sale-form.component.html',
  styleUrls: ['./notice-sale-form.component.css']
})
export class NoticeSaleFormComponent extends BaseFormComponent implements OnInit {
  
  id: number
  edital: Notice;
  editalId : number

  constructor(
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private noticeSaleService: NoticeSaleService,
        private editaService: NoticeService
  ) {
    super();
  }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.editalId = params['id'];
      if (this.editalId) {
          const edital$ = this.editaService.loadByID(this.editalId);
          edital$.subscribe(edital => {
              this.edital = edital;
          });
      }
  });



  this.cadastroForm = this.fb.group({
    id: [''],
    valorLance: [
      '',
      [
        Validators.required
      ],
    ]
  });



  }

  submit() {
        let msgSuccess = 'Lance fetuado com sucesso!';
        let msgError = 'Erro ao efetuar um Lance ou a empresa que você está ja efetuaou um lance nesse edital!';

        this.noticeSaleService.savarLeilao(this.cadastroForm.value, this.edital.id).subscribe(
          (success) => {
            this.toastr.success(msgSuccess, 'Informação :)');
            this.location.back();
          },
          error =>
          //this.alertService.showAlertDanger(msgError),
          this.toastr.error(msgError, 'Opa :(')
        );
  }

  cancelar(): any {
    this.router.navigate(['/editais/lista'], { relativeTo: this.route });
  }

  listaEditais(): any{
    this.router.navigate(['/editais/lista'], { relativeTo: this.route });
  }


}
