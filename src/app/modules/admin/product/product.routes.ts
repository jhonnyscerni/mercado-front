import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: ProductListComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_ADMIN', 'ROLE_BUYER']
          },
          { path: '', redirectTo: '/produtos/lista', pathMatch: 'full' }
        ]
      }
];
