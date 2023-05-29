import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormDebugComponent,
        ErrorMsgComponent,
        AlertModalComponent,
        ConfirmModalComponent
      ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormDebugComponent,
        ErrorMsgComponent,
        AlertModalComponent,
        ConfirmModalComponent
    ]
})
export class SharedModule
{
}
