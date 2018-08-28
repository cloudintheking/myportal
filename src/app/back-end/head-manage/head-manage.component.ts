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
  imgIndex: any; // 选择图片位置

  constructor(private  sanitizer: DomSanitizer, private logoApi: BackApiService, private  dialog: MatDialog) {
  }

  ngOnInit() {
    this.getHeaderImgs();
  }

  /**
   * 获取背景图
   */
  getHeaderImgs() {
    this.logoApi.getHeaderImgs()
      .subscribe(
        success => {
          this.headerImgs = success.prop.headImg.map(value => {
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
  openFileDialog(index?) {
    this.imgIndex = index;
    $('#browsefile').click();

  }

  /**
   * 删除
   * @param logo
   */
  deleteHeaderImg(index) {
    const params = {
      pos: index
    };
    this.logoApi.deleteHeaderImg(params).subscribe(
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
    this.imgData.append('file', file); // 文件保存至formdata
    const params = { // 上传参数
      viewByAnon: true,
      maxFileSize: file.size,
      longLife: true
    };
    console.log('上传参数', params);
    this.logoApi.uploadFile(this.imgData, params)
      .switchMap((data) => {
        const param = {
          fileid: data.id,
          pos: ''
        };
        if (this.imgIndex) {
          param.pos = this.imgIndex;
          return this.logoApi.updateHeaderImg(param); // 编辑背景图
        } else {
          return this.logoApi.addHeaderImg(param); // 新增背景图
        }
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
    this.imgData.delete('file'); // 清除imgData
  }
}

interface HeaderImg {
  id: string;
  url: string;
}
