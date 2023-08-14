
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeMyListComponent } from './notice-my-list/notice-my-list.component';
import { NOTICE_MY_ROUTES } from './notice-my.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoticeMySaleListComponent } from './notice-my-sale-list/notice-my-sale-list.component';
import { NoticeMyFormComponent } from './notice-my-form/notice-my-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoticeMyItemFormComponent } from './notice-my-item-form/notice-my-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NOTICE_MY_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SharedModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTabsModule,
  ],
  declarations: [NoticeMyListComponent, NoticeMySaleListComponent, NoticeMyFormComponent, NoticeMyItemFormComponent],
  exports: [NoticeMyListComponent, NoticeMySaleListComponent, NoticeMyFormComponent, NoticeMyItemFormComponent]
})
export class NoticeMyModule { }
