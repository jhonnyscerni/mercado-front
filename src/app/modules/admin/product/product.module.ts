import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { PRODUCT_ROUTES } from './product.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_ROUTES),
],
  declarations: [ProductComponent],
  exports: [ProductComponent],
})
export class ProductModule {}
