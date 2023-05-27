import { AuthoritiesGuard } from './../../../core/services/authorities.guard';
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const USERS_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: UserListComponent,
            canActivate: [AuthoritiesGuard]
          },
          { path: '', redirectTo: '/usuarios/lista', pathMatch: 'full' }
        ]
      }
];
