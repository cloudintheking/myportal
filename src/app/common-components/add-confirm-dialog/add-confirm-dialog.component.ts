import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-add-confirm-dialog',
  templateUrl: './add-confirm-dialog.component.html',
  styleUrls: ['./add-confirm-dialog.component.css']
})
export class AddConfirmDialogComponent implements OnInit {
  @Output()
  doConfirm = new EventEmitter<any>();
  message: string; // 提示信息

  constructor(private  dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private date: any) {
    this.message = this.date.message;
  }

  ngOnInit() {
  }

  confirm() {
    this.doConfirm.emit();
    this.dialog.closeAll();
  }

}
