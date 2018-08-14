import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {BackApiService} from '../../../service/back-api.service';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.css']
})
export class AddLinkDialogComponent implements OnInit {
  linkForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, private linkApi: BackApiService) {
    this.linkForm = new FormBuilder().group({
      group: [],
      name: [],
      address: [],
      updateby: []
    });
  }

  ngOnInit() {
  }

  //提交
  doPost(){}
}
