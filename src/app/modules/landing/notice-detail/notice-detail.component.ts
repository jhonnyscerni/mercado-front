import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Notice } from 'app/models/notice';
import { EditalArquivoResponse } from 'app/models/notice-file';
import { NoticeFileService } from 'app/services/notice-file.service';
import { NoticeService } from 'app/services/notice.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  test: Date = new Date();
  user: any;
  isCollapsed = true;
  id: number
  edital: Notice;
  editalId : number
  editalArquivo: EditalArquivoResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editaService: NoticeService,
    private authService: AuthService,
    private uploadService: NoticeFileService,) { }


    ngOnInit() {

      this.route.params.subscribe((params: any) => {
        this.editalId = params['editalId'];
        if (this.editalId) {
            const edital$ = this.editaService.loadByID(this.editalId);
            edital$.subscribe(edital => {
              console.log(edital)
                this.edital = edital;
            });
        }
    });
    this.onRefreshArquivoResponse()
  }

  usuarioLogado(): boolean {
    this.user = this.authService.getUserName();
    return this.authService.isAuthenticated();
  }

  onRefreshArquivoResponse(): any{
    const $editalArquivo = this.uploadService.loadByID(this.editalId);
    $editalArquivo.subscribe(editalArquivo => {
      this.editalArquivo = editalArquivo;
    }, error => this.editalArquivo = new EditalArquivoResponse());
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
  

  onLance(id): any {
    this.router.navigate(['../../editais', id ,'leilao', 'lance' ], { relativeTo: this.route });
  }

  onDashboard(): any {
    this.router.navigate(['/usuarios/lista']);
}

logout(): any {
  this.authService.signOut();
  this.router.navigate(['/']);
}

}
