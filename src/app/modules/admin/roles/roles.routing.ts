import { RoleListComponent } from './role-list/role-list.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {AuthoritiesGuard} from '../../../core/services/authorities.guard';


export const grupoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lista', component: RoleListComponent,
        canActivate: [AuthoritiesGuard],
         data: ['ROLE_ADMIN']
      },
      { path: '', redirectTo: '/grupos/lista', pathMatch: 'full' }
    ]
  }
];
