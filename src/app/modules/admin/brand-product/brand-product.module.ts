import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrandProductComponent } from './brand-product.component';
import { BRAND_PRODUCT_ROUTES } from './brand-product.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BRAND_PRODUCT_ROUTES),
],
  declarations: [BrandProductComponent],
  exports: [BrandProductComponent],
})
export class BrandProductModule {}
