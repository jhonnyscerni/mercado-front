import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryProductComponent } from './category-product.component';
import { CATEGORY_PRODUCT_ROUTES } from './category-product.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORY_PRODUCT_ROUTES)],
  declarations: [CategoryProductComponent],
  exports: [CategoryProductComponent],
})
export class CategoryProductModule {}
