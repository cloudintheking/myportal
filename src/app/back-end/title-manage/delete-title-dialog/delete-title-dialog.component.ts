import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {BackApiService} from '../../../service/back-api.service';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {Observable} from 'rxjs/Observable';

/**
 * @author hl
 * @date 2018/8/13
 * @Description: 栏目删除弹出框
 */
@Component({
  selector: 'app-delete-title-dialog',
  templateUrl: './delete-title-dialog.component.html',
  styleUrls: ['./delete-title-dialog.component.css']
})
export class DeleteTitleDialogComponent implements OnInit {
  toID = null;
  typeFrom: any;
  titleList: Observable<any>;
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private titleApi: BackApiService, private  dialog: MatDialog) {
    this.typeFrom = data.id;
  }

  ngOnInit() {
    this.titleList = this.titleApi.getTitlesTree({navBar: true}).map(res => res.data);
  }

  /**
   * 执行删除操作
   */
  doPost() {
    const params = {
      typeFrom: this.data.id,
      typeTo: this.toID
    };
    console.log(params);
    this.titleApi.deleteTitle(params).subscribe(
      result => {
        this.dialog.open(AddConfirmDialogComponent, {
          width: '50%',
          data: {
            message: result.message
          }
        });
        this.doConfirm.emit(); // 分发信号
      },
      err => {
      });
    this.dialog.closeAll();
  }

}
