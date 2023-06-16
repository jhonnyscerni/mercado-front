import { Routes } from '@angular/router';
import { BrandProductListComponent } from './brand-product-list/brand-product-list.component';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';

export const BRAND_PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: BrandProductListComponent,
            canActivate: [AuthoritiesGuard],
             data: ['ROLE_ADMIN']
          },
          { path: '', redirectTo: '/marca-produtos/lista', pathMatch: 'full' }
        ]
      }
];
