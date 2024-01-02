import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'app/models/notice';
import { EditalArquivoResponse, NoticeFile } from 'app/models/notice-file';
import { NoticeFileService } from 'app/services/notice-file.service';
import { NoticeService } from 'app/services/notice.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-notice-my-file',
  templateUrl: './notice-my-file.component.html',
  styleUrls: ['./notice-my-file.component.css']
})
export class NoticeMyFileComponent implements OnInit {

  arquivo: NoticeFile = new NoticeFile();
  editalArquivo: EditalArquivoResponse;
  editalId: number
  edital: Notice;
  itemSelecionado: number;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: NoticeFileService,
    private editaService: NoticeService,
    private toastr: ToastrService,
    private alertService: AlertModalService,
  ){
  
  }
  ngOnInit(): void {
    this.onRefresh()
    this.onRefreshArquivoResponse()
  }
  
  onFilechange(event: any) {
    this.arquivo.arquivo = event.target.files[0]
    this.arquivo.descricao = event.target.files[0].name

  }

  onRefresh(): any {
    this.route.params.subscribe((params: any) => {
      this.editalId = params['editalId'];
      if (this.editalId) {
        const edital$ = this.editaService.loadByID(this.editalId);
        edital$.subscribe(edital => {
          this.edital = edital;
        });
       
      }
    });
  }

  onRefreshArquivoResponse(): any{
    const $editalArquivo = this.uploadService.loadByID(this.editalId);
    $editalArquivo.subscribe(editalArquivo => {
      this.editalArquivo = editalArquivo;
    }, error => this.editalArquivo = new EditalArquivoResponse());
  }
  
  upload() {
    if (this.arquivo.arquivo) {

      let msgSuccess = 'Arquivo Adicionado ao Edital com sucesso!';
      let msgError = 'Erro ao Arquivo ao Edital, tente novamente!';
  
  
      this.uploadService.uploadfile(this.arquivo.arquivo, this.arquivo.descricao, this.editalId).subscribe(
          (success) => {
              this.toastr.success(msgSuccess, 'Informação :)');
              this.onRefreshArquivoResponse();
          },
          error => this.toastr.error(msgError, 'Opa :(')
      );

  }
}

onDownload() {
  this.uploadService
    .getFileFromApi(this.editalId)
    .pipe(take(1))
    .subscribe((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));

        const contentDisposition = response.headers.get('content-disposition');
        const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        downloadLink.download = fileName;
        downloadLink.click();
    });  
}


onDelete(): any {
  this.itemSelecionado = this.edital.id;
  const result$ = this.alertService.showConfirm(
    'Confirmação',
    'Tem certeza que deseja remover esse item?',
  );
  result$
    .asObservable()
    .pipe(
      take(1),
      switchMap(result =>
        result ? this.uploadService.remove(this.itemSelecionado) : EMPTY,
      ),
    )
    .subscribe(
      (success) => {
        this.onRefreshArquivoResponse();
      },
    );
}

  cancelar(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }

  lista(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }
 }