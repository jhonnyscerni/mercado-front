import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduct } from 'app/models/category-product';
import { CategoryProductService } from 'app/services/category-product.service';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
})
export class CategoryProductListComponent implements OnInit{
    categories: CategoryProduct[];
    errorMessage: string;

    categoryselected: CategoryProduct;
    page: number = 1;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryProductService: CategoryProductService
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

    create(): any {
        throw new Error('Method not implemented.');
    }

}
