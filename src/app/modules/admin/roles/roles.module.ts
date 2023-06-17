import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RouterModule } from '@angular/router';
import { grupoRoutes } from './roles.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(grupoRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        NgxPaginationModule,
    ],
  declarations: [RolesComponent, RoleListComponent],
  exports: [RolesComponent, RoleListComponent]
})
export class RolesModule { }
