import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean>;

  constructor() { }

  ngOnInit(): any {
    this.confirmResult = new Subject();
  }

  onConfirm(): any {
    this.confirmAndClose(true);
  }

  onClose(): any {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean): any {
    this.confirmResult.next(value);
  }

}
