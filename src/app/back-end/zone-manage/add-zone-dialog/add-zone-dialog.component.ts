import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSelectChange} from '@angular/material';
import {BackApiService} from '../../../service/back-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-add-home-dialog',
  templateUrl: './add-zone-dialog.component.html',
  styleUrls: ['./add-zone-dialog.component.css']
})
export class AddZoneDialogComponent implements OnInit {
  zoneForm: FormGroup; // 模块表单数据
  categoryTree: Observable<any>; // 栏目树
  categoryLevel1: Observable<any>; // 一级栏目组
  levelON_OFF: Boolean = true; // 栏目等级开关
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private zoneApi: BackApiService) {
    this.zoneForm = new FormBuilder().group({
      id: [],
      name: [],
      category: [],
      level: [1],
      style: [],
      width: [],
      pos: [],
      show: [],
      route: []
    });
  }

  ngOnInit() {
    this.categoryLevel1 = this.zoneApi.getCategories({level: 1}).map(res => res.data);
    this.categoryTree = this.zoneApi.getCategoriesTree({show: false, deep: 2}).map(res => res.data);
    if (this.data.id) { // 传id时
      this.zoneApi.getZoneByID(this.data.id)
        .subscribe(
          result => {
            if (result.status === 1) {
              this.zoneForm = new FormBuilder().group({
                id: [result.data.id],
                name: [result.data.name],
                category: [result.data.category.id],
                level: [result.data.category.level],
                style: [result.data.style],
                width: [result.data.width],
                pos: [result.data.pos],
                show: [result.data.show]
              });
              if (result.data.category.level === 1) {
                this.levelON_OFF = true;
              } else {
                this.levelON_OFF = false;
              }
            } else {
              this.dialog.closeAll();
              this.dialog.open(AddConfirmDialogComponent, {
                width: '50%',
                data: {
                  message: result.message
                }
              });
            }
          },
          error1 => {
            this.dialog.closeAll();
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
   * 提交表单数据
   */
  doPost() {
    if (!this.zoneForm.valid) {
      return;
    }
    console.log('首页模块表单提交数据', this.zoneForm.value);
    if (this.data.id) { // 更新首页模块
      this.zoneApi.updateZone(this.zoneForm.value).subscribe(
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
          this.doConfirm.emit(); // 发送确认信号
        }
      );
    } else { // 新增首页模块
      this.zoneApi.addZone(this.zoneForm.value).subscribe(
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
          this.doConfirm.emit();
        }
      );
    }
    this.dialog.closeAll();
  }

  /**
   * 等级开关
   * @param $event
   */
  levelOnOff($event: MatSelectChange) {
    console.log($event);
    if ($event.value === 1) {
      this.levelON_OFF = true;
    } else {
      this.levelON_OFF = false;
    }
  }
}
