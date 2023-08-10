import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';

@Component({
  selector: 'app-notice-my-form',
  templateUrl: './notice-my-form.component.html',
  styleUrls: ['./notice-my-form.component.css']
})
export class NoticeMyFormComponent extends BaseFormComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  submit() {
    throw new Error('Method not implemented.');
  }


}
