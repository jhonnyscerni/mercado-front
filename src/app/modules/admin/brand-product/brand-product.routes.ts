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
                canActivate: [AuthoritiesGuard]
            },
            {
                path: 'editar/:idMarca', component: BrandFormComponent,
                canActivate: [AuthoritiesGuard]
              },
              {
                path: 'detalhe/:idMarca', component: BrandFormComponent,
                canActivate: [AuthoritiesGuard]
              },
            {
                path: 'lista', component: BrandProductListComponent,
                canActivate: [AuthoritiesGuard]
            },
            { path: '', redirectTo: '/marca-produtos/lista', pathMatch: 'full' }
        ]
    }
];
