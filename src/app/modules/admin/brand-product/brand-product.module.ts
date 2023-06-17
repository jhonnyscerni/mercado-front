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
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { BrandFormComponent } from './brand-form/brand-form.component';

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
    NgxPaginationModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SharedModule
],
  declarations: [BrandProductComponent, BrandProductListComponent, BrandFormComponent],
  exports: [BrandProductComponent, BrandProductListComponent, BrandFormComponent],
})
export class BrandProductModule {}
