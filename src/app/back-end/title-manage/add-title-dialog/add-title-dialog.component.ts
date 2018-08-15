import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-add-title-dialog',
  templateUrl: './add-title-dialog.component.html',
  styleUrls: ['./add-title-dialog.component.css']
})
export class AddTitleDialogComponent implements OnInit {
  status: Boolean = true; // 状态 0:禁用, 1:启用
  statusMess: String = '启用'; // 状态提示信息
  titleList: Observable<any>;
  formModel: FormGroup; // 表单数据
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private  dialog: MatDialog,
              private sanitizer: DomSanitizer, private  titleApi: BackApiService) {
    this.formModel = new FormBuilder().group({
      id: [],
      name: [],
      pid: [],
      inNavBar: [],
      displayStyle: [],
      route: []
    });
  }

  ngOnInit() {
    this.titleList = this.titleApi.getTitlesByLevel('1').map(res => res.data);
    if (this.data.id) { // 传id时
      this.titleApi.getTitleById(this.data.id).subscribe(
        result => {
          console.log('title', result);
          if (1 === result.status) {
            this.formModel = new FormBuilder().group({
              id: [result.data.id],
              name: [result.data.name],
              pid: [result.data.pid ? result.data.pid : '0'],
              inNavBar: [result.data.inNavigationBar],
              displayStyle: [result.data.displayStyle]
            });
          } else {
            this.dialog.open(AddConfirmDialogComponent, {
              width: '50%',
              data: {
                message: result.message
              }
            });
          }
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

  /**
   * 提交数据
   */
  doPost(value) {
    switch (value.displayStyle) {
      case '1':
        value.route = '/frontend/other/style1';
        break;
      case '2':
        value.route = '/frontend/other/style2';
        break;
      default:
        break;
    }
    console.log('title表单', value);
    if (this.data.id) { // 更新操作
      this.titleApi.updateTitle(value).subscribe(
        result => {
          console.log('更新成功');
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: result.message
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
          this.doConfirm.emit(); // 分发确认信号
        });
    } else { // 新增操作
      this.titleApi.addTitle(value).subscribe(
        result => {
          console.log('新增成功');
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: result.message
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
          this.doConfirm.emit(); // 分发确认信号
        });
    }
    this.dialog.closeAll();
  }

  /**
   * 文章状态更改
   * @param event
   */
  statusChange(event) {
    if (event.checked) {
      this.statusMess = '启用';
    } else {
      this.statusMess = '禁用';
    }
    console.log(event);
  }

}
