import { Routes } from '@angular/router';
import { BrandProductListComponent } from './brand-product-list/brand-product-list.component';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { BrandFormComponent } from './brand-form/brand-form.component';

export const BRAND_PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'adicionar', component: BrandFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_BUYER']
            },
            {
                path: 'editar/:idMarca', component: BrandFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
              },
              {
                path: 'detalhe/:idMarca', component: BrandFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
              },
            {
                path: 'lista', component: BrandProductListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN', 'ROLE_BUYER']
            },
            { path: '', redirectTo: '/marca-produtos/lista', pathMatch: 'full' }
        ]
    }
];
