import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'app/models/notice';
import { Sale } from 'app/models/sale';
import { NoticeSaleService } from 'app/services/notice-sale.service';
import { NoticeService } from 'app/services/notice.service';

@Component({
  selector: 'app-notice-my-sale-list',
  templateUrl: './notice-my-sale-list.component.html',
  styleUrls: ['./notice-my-sale-list.component.css']
})
export class NoticeMySaleListComponent implements OnInit {

  id: number
  edital: Notice;
  editalId: number

  sales: Sale[];
  saleSelecionado: Sale;

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editaService: NoticeService,
    private noticeSaleService: NoticeSaleService
  ) { }

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

  this.onRefresh();

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
handlePageChange(event): any {
  this.page = event;
  this.pageElement = this.page - 1;
  this.onRefresh();
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

  cancelar(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }

  listaEditais(): any{
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }
}
