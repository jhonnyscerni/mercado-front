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
import { CategoryProductFormComponent } from './category-product-form/category-product-form.component';

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
  declarations: [CategoryProductComponent, CategoryProductListComponent, CategoryProductFormComponent],
  exports: [CategoryProductComponent, CategoryProductListComponent, CategoryProductFormComponent],
})
export class CategoryProductModule {}
