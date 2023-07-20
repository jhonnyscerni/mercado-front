import { AuthoritiesGuard } from './../../../core/services/authorities.guard';
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const USERS_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: UserListComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN']
          },
          {
            path: 'cadastrar', component: UserFormComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN']
          },
          {
            path: 'editar/:userId', component: UserFormComponent,
            canActivate: [AuthoritiesGuard],
            data: ['ROLE_SUPER_ADMIN','ROLE_ADMIN']
          },
          { path: '', redirectTo: '/usuarios/lista', pathMatch: 'full' }
        ]
      }
];
