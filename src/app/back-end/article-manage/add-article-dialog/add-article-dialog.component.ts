import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSelectChange} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {BackApiService} from '../../../service/back-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {environment} from 'environments/environment';

/**
 * @author hl
 * @date 2018/8/1
 * @Description: 文章发布组件
 */

@Component({
  selector: 'app-add-article-dialog',
  templateUrl: './add-article-dialog.component.html',
  styleUrls: ['./add-article-dialog.component.css']
})
export class AddArticleDialogComponent implements OnInit {
  articleForm: FormGroup; // 文章表单数据
  statusMessage = '启用'; // 状态说明符
  imgData: FormData = new FormData(); // 图片数据
  imgUrl: any; // 图片请求路径
  imgID: any; // 图片ID
  options: object; // 富文本配置
  categoryTree: Observable<any>; // 树形栏目
  categoryLevel1: Observable<any>; // 一级栏目组
  doConfirm: EventEmitter<any> = new EventEmitter<any>(); // 确认信号分发器
  fileUrl = environment.fileUrl; // 文件系统域名
  levelON_OFF: Boolean = true; // 栏目等级开关

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private  dialog: MatDialog,
              private sanitizer: DomSanitizer, private  articleApi: BackApiService) {
    this.options = this.articleApi.froalaOptions; // 富文本配置信息
    this.articleForm = new FormBuilder().group({
      id: [],
      category: [],
      level: [1],
      title: [],
      content: [],
      show: [],
      cover: [],
      route: []
    });
  }

  ngOnInit() {
    this.categoryLevel1 = this.articleApi.getCategories({level: 1}).map(res => res.data);
    this.categoryTree = this.articleApi.getCategoriesTree({show: false, deep: 2}).map(res => res.data);
    if (this.data.id) {  // 传id时
      this.articleApi.getArticleById(this.data.id).subscribe(
        result => {
          this.articleForm = new FormBuilder().group({
            id: [result.data.id],
            category: [result.data.category.id],
            level: [result.data.category.level],
            title: [result.data.title],
            content: [result.data.content],
            show: [result.data.show],
            cover: [result.data.cover]
          });
          if (result.data.category.level === 1) {
            this.levelON_OFF = true;
          } else {
            this.levelON_OFF = false;
          }
          this.imgUrl = this.fileUrl + '/japi/filesystem/getFile?id=' + result.data.cover;
          console.log('初始化imgUrl', this.imgUrl);
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
    if (!this.articleForm.valid) {
      return;
    }
    if (this.imgID) {
      this.articleForm.value.cover = this.imgID;
    }
    console.log('文章表单数据', this.articleForm.value);
    if (this.data.id) { // 更新文章
      this.articleApi.updateArticle(this.articleForm.value).subscribe(
        success => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: {
              message: success.message
            }
          })
          ;
        },
        error1 => {
          this.dialog.open(AddConfirmDialogComponent, {
            width: '50%',
            data: error1.message
          });
        },
        () => {
          this.doConfirm.emit(); // 分发确认信号
        }
      );
    } else { // 新增文章
      this.articleForm.value.route = 'frontend/category/detail';
      this.articleApi.addArticle(this.articleForm.value).subscribe(
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
   * 上传图片时相应操作
   * @param event
   */
  onchangeSelectFile(event) {
    const file: File = event.target.files[0];
    this.imgData.append('files', file); // 图片数据保存
    $('#filename').html(file.name);
    const params = { // 上传参数
    };
    this.articleApi.uploadFile(this.imgData, params).subscribe(
      success => {
        this.imgID = success.data[0].id;
        this.imgUrl = success.data[0].link;
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
      });
    // this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)); // 图片数据转换为预览URL
    this.imgData.delete('files'); // 清除imgData
  }

  /**
   * 文章状态更改
   * @param event
   */
  statusChange(event) {
    if (event.checked) {
      this.statusMessage = '启用';
    } else {
      this.statusMessage = '禁用';
    }
    console.log(event);
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
