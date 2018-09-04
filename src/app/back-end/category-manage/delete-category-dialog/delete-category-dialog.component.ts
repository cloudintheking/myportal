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
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css']
})
export class DeleteCategoryDialogComponent implements OnInit {
  categoryList: Observable<any>;
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号
  toID = null;
  typeFrom: any;
  delArticle: Boolean = false; // 是否删除关联文章
  delZone: Boolean = false; // 是否删除关联首页展区
  articleRef: string; // 如果不删除文章，文章新关联的栏目id
  zoneRef: string; // 如果不删除首页展区，首页展区新关联的栏目id
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private categoryApi: BackApiService, private  dialog: MatDialog) {
    this.typeFrom = data.id;
  }

  ngOnInit() {
    this.categoryList = this.categoryApi.getCategoriesTree({show: false, deep: 2}).map(res => res.data);
  }

  /**
   * 执行删除操作
   */
  doPost() {
    const params = {
      id: this.data.id,
      delA: this.delArticle,
      delZ: this.delZone,
      articleRef: this.articleRef,
      zoneRef: this.zoneRef
    };
    console.log(params);
    this.categoryApi.deleteCategory(params).subscribe(
      result => {
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
    this.dialog.closeAll();
  }

}
