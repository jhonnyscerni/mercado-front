import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { ProductFormComponent } from './product-form/product-form.component';

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'cadastrar', component: ProductFormComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
        },
        {
            path: 'editar/:idProduto', component: ProductFormComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
        },
          {
            path: 'lista', component: ProductListComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
          },
          { path: '', redirectTo: '/produtos/lista', pathMatch: 'full' }
        ]
      }
];
