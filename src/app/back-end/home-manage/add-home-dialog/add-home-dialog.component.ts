import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {BackApiService} from '../../../service/back-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-home-dialog',
  templateUrl: './add-home-dialog.component.html',
  styleUrls: ['./add-home-dialog.component.css']
})
export class AddHomeDialogComponent implements OnInit {

  homeForm: FormGroup; // 模块表单数据
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private homeApi: BackApiService) {
    this.homeForm = new FormBuilder().group({
      name: [],
      articleType: [],
      type: [],
      flex: [],
      pos: [],
      hide: []
    });
  }

  ngOnInit() {
  }

  /**
   * 提交表单数据
   */
  doPost() {
  }
}
