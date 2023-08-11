import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { USERS_ROUTES } from './users.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { UserListComponent } from './user-list/user-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(USERS_ROUTES),
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
        TextMaskModule
    ],
  declarations: [UsersComponent, UserListComponent, UserFormComponent],
  exports: [UsersComponent, UserListComponent, UserFormComponent],
})
export class UsersModule {}
