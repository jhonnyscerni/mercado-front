import { Routes } from '@angular/router';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { CategoryProductListComponent } from './category-product-list/category-product-list.component';

export const CATEGORY_PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: CategoryProductListComponent,
            canActivate: [AuthoritiesGuard],
             data: ['ROLE_ADMIN']
          },
          { path: '', redirectTo: '/categoria-produtos/lista', pathMatch: 'full' }
        ]
      }
];
