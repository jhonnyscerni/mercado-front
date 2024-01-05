import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduct } from 'app/models/category-product';
import { CategoryProductService } from 'app/services/category-product.service';
import { AlertModalService } from 'app/shared/alert-modal.service';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
})
export class CategoryProductListComponent implements OnInit{
    categories: CategoryProduct[];
    errorMessage: string;

    categoryselected: CategoryProduct;
    
    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryProductService: CategoryProductService,
        private alertService: AlertModalService,
    ) {
    }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh(): void {
        this.categoryProductService.list()
            .subscribe((value) => {
                this.categories = value;
            }, (error) => {
                console.log(error);
            });
    }

    onDelete(brand): any {
        this.categoryselected = brand;
        const result$ = this.alertService.showConfirm(
          'Confirmação',
          'Tem certeza que deseja remover esse item?',
        );
        result$
          .asObservable()
          .pipe(
            take(1),
            switchMap(result =>
              result ? this.categoryProductService.remove(brand.id) : EMPTY,
            ),
          )
          .subscribe(
            (success) => {
              this.onRefresh();
            },
          );
      }

    onCreate(): any {
        this.router.navigate(['/categoria-produtos/adicionar'], { relativeTo: this.route });
    }

    onEdit(id): any {
        this.router.navigate(['/categoria-produtos/editar', id], { relativeTo: this.route });
    }

    onDetalhe(id): any {
        this.router.navigate(['/categoria-produtos/detalhe', id], { relativeTo: this.route });
    }

}
