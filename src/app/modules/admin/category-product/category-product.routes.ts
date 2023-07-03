import { Routes } from '@angular/router';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { CategoryProductListComponent } from './category-product-list/category-product-list.component';
import { CategoryProductFormComponent } from './category-product-form/category-product-form.component';

export const CATEGORY_PRODUCT_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'adicionar', component: CategoryProductFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_ADMIN', 'ROLE_BUYER']
            },
            {
                path: 'editar/:idCategoriaProduto', component: CategoryProductFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_ADMIN', 'ROLE_BUYER']
            },
            {
                path: 'detalhe/:idCategoriaProduto', component: CategoryProductFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_ADMIN', 'ROLE_BUYER']
            },
            {
                path: 'lista', component: CategoryProductListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_ADMIN', 'ROLE_BUYER']
            },
            { path: '', redirectTo: '/categoria-produtos/lista', pathMatch: 'full' }
        ]
    }
];
