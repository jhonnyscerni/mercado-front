import { Brand } from 'app/models/brand';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'app/services/brand.service';
import { EMPTY, switchMap, take } from 'rxjs';
import { AlertModalService } from 'app/shared/alert-modal.service';

@Component({
  selector: 'app-brand-product-list',
  templateUrl: './brand-product-list.component.html',
})
export class BrandProductListComponent implements OnInit{
    brands: Brand[];
    errorMessage: string;

    brandselected: Brand;
 
    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private brandService: BrandService,
        private alertService: AlertModalService,
    ) {
    }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh(): void {
        this.brandService.list()
            .subscribe((value) => {
                this.brands = value;
            }, (error) => {
                console.log(error);
            });
    }

    onDelete(brand): any {
        this.brandselected = brand;
        const result$ = this.alertService.showConfirm(
          'Confirmação',
          'Tem certeza que deseja remover esse item?',
        );
        result$
          .asObservable()
          .pipe(
            take(1),
            switchMap(result =>
              result ? this.brandService.remove(brand.id) : EMPTY,
            ),
          )
          .subscribe(
            (success) => {
              this.onRefresh();
            },
          );
      }

    onCreate(): any {
        this.router.navigate(['/marca-produtos/adicionar'], { relativeTo: this.route });
    }

    onEdit(id): any {
        this.router.navigate(['/marca-produtos/editar', id], { relativeTo: this.route });
    }

    onDetalhe(id): any {
        this.router.navigate(['/marca-produtos/detalhe', id], { relativeTo: this.route });
    }


}
