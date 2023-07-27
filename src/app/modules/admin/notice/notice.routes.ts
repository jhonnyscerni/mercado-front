import { NoticeSaleFormComponent } from './notice-sale-form/notice-sale-form.component';
import { Routes } from '@angular/router';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';
import { NoticeListComponent } from './notice-list/notice-list.component';


export const NOTICE_ROUTES: Routes = [
    {
        path: '',
        children: [
          {
            path: 'lista', component: NoticeListComponent,
            canActivate: [AuthoritiesGuard]
          },
          {
            path: ":id/leilao", component: NoticeSaleFormComponent,
          },
          { path: '', redirectTo: '/editais/lista', pathMatch: 'full' }
        ]
      }
];
