import { RoleListComponent } from './role-list/role-list.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthoritiesGuard } from '../../../core/services/authorities.guard';
import { RoleFormComponent } from './role-form/role-form.component';


export const grupoRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'adicionar', component: RoleFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN']
            },
            {
                path: 'lista', component: RoleListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['ROLE_SUPER_ADMIN']
            },
            { path: '', redirectTo: '/grupos/lista', pathMatch: 'full' }
        ]
    }
];
