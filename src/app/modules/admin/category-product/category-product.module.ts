import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryProductComponent } from './category-product.component';
import { CATEGORY_PRODUCT_ROUTES } from './category-product.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CategoryProductListComponent } from './category-product-list/category-product-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORY_PRODUCT_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
],
  declarations: [CategoryProductComponent, CategoryProductListComponent],
  exports: [CategoryProductComponent, CategoryProductListComponent],
})
export class CategoryProductModule {}
