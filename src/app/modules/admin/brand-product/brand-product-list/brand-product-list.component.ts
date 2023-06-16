import { Brand } from 'app/models/brand';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'app/services/brand.service';

@Component({
  selector: 'app-brand-product-list',
  templateUrl: './brand-product-list.component.html',
})
export class BrandProductListComponent implements OnInit{
    brands: Brand[];
    errorMessage: string;

    brandselected: Brand;
    page: number = 1;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private brandService: BrandService
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

    create(): any {
        throw new Error('Method not implemented.');
    }


}
