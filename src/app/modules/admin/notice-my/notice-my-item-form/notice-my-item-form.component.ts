import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'app/models/notice';
import { NoticeItem } from 'app/models/notice-item';
import { Product } from 'app/models/product';
import { ItemNoticeService } from 'app/services/item-notice.service';
import { NoticeService } from 'app/services/notice.service';
import { ProductService } from 'app/services/product.service';
import { UnitMeasureService } from 'app/services/unit-measure.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, switchMap, take } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notice-my-item-form',
  templateUrl: './notice-my-item-form.component.html',
  styleUrls: ['./notice-my-item-form.component.css']
})
export class NoticeMyItemFormComponent extends BaseFormComponent implements OnInit {

  errorMessage: string;
  products: Product[];
  unidadeMedidas = [];

  itemSelecionado: NoticeItem;

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10;

  edital: Notice;
  editalId: number

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private produtoService: ProductService,
    private unidadeMedidaService: UnitMeasureService,
    private editaService: NoticeService,
    private itemService: ItemNoticeService,
    private alertService: AlertModalService,
  ) {
    super();
  }

  ngOnInit() {

    this.onRefresh();
    this.carregarProdutos();
    this.carregarUnidadeMedida();

    this.cadastroForm = this.fb.group({
      id: [''],
      produtoId: ['', [Validators.required]],
      unidadeMedidaId: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      largura: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      profundidade: ['', [Validators.required]],
      valorMaximo: ['', [Validators.required]],
      observacao: [''],
    });
  }

  submit() {

    let msgSuccess = 'Item Adicionado ao Edital com sucesso!';
    let msgError = 'Erro ao Adicionado ao Edital, tente novamente!';


    this.itemService.saveItemEdital(this.editalId, this.cadastroForm.value).subscribe(
        (success) => {
            this.toastr.success(msgSuccess, 'Informação :)');
            this.onRefresh();
        },
        error => this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
  }

  lista(): any {
    this.router.navigate(['/meus-editais/lista'], { relativeTo: this.route });
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


  carregarProdutos(): any {
    const params = this.getRequestParams(this.pageElement, this.size);

    this.produtoService.listSearchPage(params)
      .subscribe(
        (product) => {
          this.products = product.content;
          this.totalElements = product.totalElements;
          this.pageElement = product.number;
          this.size = product.size;
        },
        error => this.errorMessage
      );
  }

  carregarUnidadeMedida(): any {
    return this.unidadeMedidaService.list()
      .subscribe((unidadeMedidas) => {
        this.unidadeMedidas = unidadeMedidas;
      });
  }

  compareFn(compared1: { id: number }, compared2: { id: number }): any {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }

  compareFn2(compared1: { id: number }, compared2: { id: number }): any {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
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


  onDelete(item): any {
    this.itemSelecionado = item;
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse item?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.itemService.remove(item.id) : EMPTY,
        ),
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
      );
  }
}
