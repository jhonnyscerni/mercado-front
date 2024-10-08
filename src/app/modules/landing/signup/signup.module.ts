import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingSignupComponent } from './signup.component';
import { landingSignUpRoutes } from './signup.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { BsDropdownModule, CollapseModule, TooltipModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        LandingSignupComponent
    ],
    exports: [LandingSignupComponent],
    imports     : [
        RouterModule.forChild(landingSignUpRoutes),
        MatButtonModule,
        MatIconModule,
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
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
        TextMaskModule,
        BsDropdownModule.forRoot(), CollapseModule.forRoot(), TooltipModule.forRoot()
    ]
})
export class LandingSignupModule
{
}
