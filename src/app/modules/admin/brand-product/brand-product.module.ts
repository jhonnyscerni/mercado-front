import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrandProductComponent } from './brand-product.component';
import { BRAND_PRODUCT_ROUTES } from './brand-product.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrandProductListComponent } from './brand-product-list/brand-product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BRAND_PRODUCT_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
],
  declarations: [BrandProductComponent, BrandProductListComponent],
  exports: [BrandProductComponent, BrandProductListComponent],
})
export class BrandProductModule {}
