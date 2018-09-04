import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-add-title-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {
  status: Boolean = true; // 状态 0:禁用, 1:启用
  statusMess: String = '启用'; // 状态提示信息
  categoryList: Observable<any>;
  formModel: FormGroup; // 表单数据
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private  dialog: MatDialog,
              private sanitizer: DomSanitizer, private  categoryApi: BackApiService) {
    this.formModel = new FormBuilder().group({
      id: [],
      name: [],
      parent: [],
      show: [],
      style: [],
      route: []
    });
  }

  ngOnInit() {
    this.categoryList = this.categoryApi.getCategories({level: 1}).map(res => res.data);
    if (this.data.id) { // 传id时
      const paramsid = {
        id: this.data.id
      };
      this.categoryApi.getCategoryById(paramsid).subscribe(
        result => {
          if (1 === result.status) {
            const pid = result.data.parent ? result.data.parent.id : ' ';
            console.log('pid', pid);
            this.formModel = new FormBuilder().group({
              id: [result.data.id],
              name: [result.data.name],
              parent: [pid],
              show: [result.data.show],
              style: [result.data.style],
              route: [result.data.route]
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
  doPost() {
    if (!this.formModel.valid) {
      return;
    }
    switch (this.formModel.value.style) {
      case 1:
        this.formModel.value.route = '/frontend/category/style1';
        break;
      case 2:
        this.formModel.value.route = '/frontend/category/style2';
        break;
      default:
        break;
    }
    if (this.data.id) { // 更新操作
      this.categoryApi.updateCategory(this.formModel.value).subscribe(
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
      this.categoryApi.addCategory(this.formModel.value).subscribe(
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
