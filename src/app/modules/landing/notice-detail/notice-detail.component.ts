import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Notice } from 'app/models/notice';
import { EditalArquivoResponse } from 'app/models/notice-file';
import { Sale } from 'app/models/sale';
import { NoticeFileService } from 'app/services/notice-file.service';
import { NoticeSaleService } from 'app/services/notice-sale.service';
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

  sales: Sale[];

    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editaService: NoticeService,
    private authService: AuthService,
    private uploadService: NoticeFileService,
    private noticeSaleService: NoticeSaleService) { }


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
    this.onRefresh();
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

  getRequestParams(pageElement, size): any {
    const params = {};

    if (pageElement) {
        params['page'] = pageElement;
    }

    if (size) {
        params['size'] = size;
    }
    return params;
}

  onRefresh(): any {
    const params = this.getRequestParams(this.pageElement, this.size);
    this.noticeSaleService.listSearchPage(this.editalId, params)
      .subscribe(
        (data) => {
          this.sales = data.content;
          console.log(this.sales)
          this.totalElements = data.totalElements;
          this.pageElement = data.number;
          this.size = data.size;
        }
      );
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
    this.router.navigate(['/editais/lista']);
}

logout(): any {
  this.authService.signOut();
  this.router.navigate(['/']);
}

}
