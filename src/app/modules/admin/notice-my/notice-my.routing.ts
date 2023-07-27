
import { Routes } from '@angular/router';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { NoticeMyListComponent } from './notice-my-list/notice-my-list.component';
import { NoticeMySaleListComponent } from './notice-my-sale-list/notice-my-sale-list.component';


export const NOTICE_MY_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: NoticeMyListComponent,
            canActivate: [AuthoritiesGuard]
          },
          {
            path: ":id/leilao/lista", component: NoticeMySaleListComponent,
          },
          { path: '', redirectTo: '/meus-editais/lista', pathMatch: 'full' }
        ]
      }
];
