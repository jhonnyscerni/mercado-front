import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { NoticeDetailComponent } from '../notice-detail/notice-detail.component';
import { NoticeSaleFormComponent } from 'app/modules/admin/notice/notice-sale-form/notice-sale-form.component';
import { AuthoritiesGuard } from 'app/core/services/authorities.guard';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent
    },
    {
        path: 'editar/:editalId', component: NoticeDetailComponent,
    },
    {
        path: ":id/leilao/lance", component: NoticeSaleFormComponent,
        canActivate: [AuthoritiesGuard],
    },
];
