import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {faAngry} from '@fortawesome/free-regular-svg-icons';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog} from '@angular/material';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-logo-manage',
  templateUrl: './head-manage.component.html',
  styleUrls: ['./head-manage.component.css']
})
export class HeadManageComponent implements OnInit {
  /*********fontawesome************/
  faAngry = faAngry;
  /********************************/
  headerImgs: Array<HeaderImg>; // 背景图组
  fileUrl = environment.fileUrl; // 文件系统域名
  imgData: FormData = new FormData(); // 上传图片数据
  optionID: any; // 配置的id
  constructor(private  sanitizer: DomSanitizer, private headImgApi: BackApiService, private  dialog: MatDialog) {
  }

  ngOnInit() {
    this.getHeaderImgs();
  }

  /**
   * 获取背景图
   */
  getHeaderImgs() {
    this.headImgApi.getOption()
      .subscribe(
        success => {
          this.optionID = success.data.id;
          this.headerImgs = success.data.headimgs.map(value => {
            return {
              id: value,
              url: this.fileUrl + '/japi/filesystem/getFile?id=' + value
            };
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

  /**
   * 打开文件对话框
   * @param index 图片位置索引
   */
  openFileDialog() {
    $('#browsefile').click();
  }

  /**
   * 删除
   * @param logo
   */
  deleteHeaderImg(value) {
    const data = {
      id: this.optionID,
      deleteImg: value
    };
    this.headImgApi.updateOption(data).subscribe(
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
        this.getHeaderImgs();
      }
    );
  }

  /**
   * 编辑背景图片
   * @param event
   */
  onchangeSelectFile(event) {
    const file: File = event.target.files[0];
    this.imgData.append('files', file); // 文件保存至formdata
    const params = { // 上传参数
    };
    console.log('文件上传参数', params);
    this.headImgApi.uploadFile(this.imgData, params)
      .switchMap(
        res => {
          const data = {
            addImg: res.data[0].id,
            id: this.optionID
          };
          console.log('更新配置参数', data);
          return this.headImgApi.updateOption(data);
        })
      .subscribe(
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
          this.getHeaderImgs();
        }
      );
    // this.logoImg = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.imgData.delete('files'); // 清除imgData
  }
}

interface HeaderImg {
  id: string;
  url: string;
}
