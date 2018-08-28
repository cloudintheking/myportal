import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-delete-link-dialog',
  templateUrl: './delete-link-dialog.component.html',
  styleUrls: ['./delete-link-dialog.component.css']
})
export class DeleteLinkDialogComponent implements OnInit {
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认分发信号
  message: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private  dialog: MatDialog) {
    this.message = this.data.message;
  }

  ngOnInit() {
  }

  /**
   * 确认信号
   */
  confirm() {
    this.doConfirm.emit();
    this.dialog.closeAll();
  }
}
