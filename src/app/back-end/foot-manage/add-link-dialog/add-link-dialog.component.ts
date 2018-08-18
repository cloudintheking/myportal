import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {BackApiService} from '../../../service/back-api.service';
import {Observable} from 'rxjs/Observable';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';

/**
 * @author hl
 * @date 2018/8/17
 * @Description: 链接编辑组件
 */
@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.css']
})
export class AddLinkDialogComponent implements OnInit {
  linkForm: FormGroup; // 链接表单数据
  linkGroup: Observable<any>; // 链接组
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号分发器
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, private linkApi: BackApiService) {
    this.linkForm = new FormBuilder().group({
      gid: [],
      id: [],
      name: [],
      url: []
    });
  }

  ngOnInit() {
    this.linkGroup = this.linkApi.getLinkGroup().map(res => res.data);
    if (this.data.id) {
      this.linkApi.getLinkByID(this.data.id).subscribe(
        success => {
          this.linkForm = new FormBuilder().group({
            gid: [success.data.groupId],
            id: [success.data.id],
            name: [success.data.name],
            url: [success.data.url]
          });
        },
        error1 => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: error1.message
            }
          });
        }
      );
    }
  }

  // 提交链接表单
  doPost() {
    if (!this.linkForm.valid) {
      return;
    }
    if (this.data.id) { // 更新链接
      this.linkApi.updateLink(this.linkForm.value).subscribe(
        success => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: success.message
            }
          });
        },
        error1 => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: error1.message
            }
          });
        },
        () => {
          this.doConfirm.emit(); // 分发信号
        }
      );
    } else { // 新增链接
      this.linkApi.addLink(this.linkForm.value).subscribe(
        success => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: success.message
            }
          });
        },
        error1 => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: error1.message
            }
          });
        },
        () => {
          this.doConfirm.emit(); // 分发信号
        }
      );
    }
    this.dialog.closeAll();
  }
}
