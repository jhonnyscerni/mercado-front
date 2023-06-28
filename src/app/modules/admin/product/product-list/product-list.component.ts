import { Product } from 'app/models/product';
import { products } from './../../../../mock-api/apps/ecommerce/inventory/data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products: Product[];
    errorMessage: string;

    productSelecionado: Product;

    searchForm: FormGroup;
    nomecontrol: FormControl;

    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private produtoService: ProductService,
        private fb: FormBuilder,
        private alertService: AlertModalService,
    ) {}

    getRequestParams(pageElement, size): any {
        let nome = this.nomecontrol.value;
        const params = {};

        if (pageElement) {
            params['page'] = pageElement;
        }

        if (size) {
            params['size'] = size;
        }

        if (nome && (nome = nome.trim()) !== '') {
            params['nome'] = nome;
        }
        return params;
    }

    ngOnInit(): any {

        this.nomecontrol = this.fb.control('');
        this.searchForm = this.fb.group({
          nomecontrol: this.nomecontrol
        });
        this.onRefresh();
      }

      handlePageChange(event): any {
        this.page = event;
        this.pageElement = this.page - 1;
        this.onRefresh();
      }

      onRefresh(): any {
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

      onSearch(): any {
        this.totalElements = 0;
        this.page = 1;
        this.pageElement = 0;
        this.size = 10;
        this.onRefresh();
      }

      onEdit(id): any {
        this.router.navigate(['../editar', id], { relativeTo: this.route });
      }

      create(): any {
        this.router.navigate(['../cadastrar'], { relativeTo: this.route });
      }

      onDelete(produto): any {
        this.productSelecionado = produto;
        const result$ = this.alertService.showConfirm(
          'Confirmação',
          'Tem certeza que deseja remover esse item?',
        );
        result$
          .asObservable()
          .pipe(
            take(1),
            switchMap(result =>
              result ? this.produtoService.remove(produto.id) : EMPTY,
            ),
          )
          .subscribe(
            (success) => {
              this.onRefresh();
            },
          );
      }

}
