import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {BackApiService} from '../../../service/back-api.service';

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
  title = ''; // 标题
  imgUrl: any = 'assets/img/bg.jpg'; // 图片路径
  summary = ''; // 摘要
  status = 'sdsd'; // 状态 0:禁用, 1:启用
  content = ''; // 富文本内容
  imgData: FormData = new FormData(); // 图片数据
  parents: any[] = [
    {
      name: '球类',
      childs: [
        {name: '桌球', id: 1},
        {name: '足球', id: 2},
        {name: '篮球', id: 3}
      ]
    },
    {
      name: '其他',
      childs: [
        {name: '游泳', id: 4},
        {name: '跑步', id: 5},
        {name: '拳击', id: 6}
      ]
    }
  ];
  options: object;
  article: any; // 请求的文章数据
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private  dialog: MatDialog,
              private sanitizer: DomSanitizer, private  articleApi: BackApiService) {
    // 富文本配置信息
    this.options = {
      placeholder: 'Edit Me',
      videoMaxSize: 1024 * 1024 * 400,
      imageUploadURL: '/upload_image',
      fileUploadURL: '/upload_file',
      videoUploadURL: '/upload_video',
      events: {
        'froalaEditor.focus': function (e, editor) {
          console.log(editor.html.get());
        },
        'froalaEditor.image.removed': function (e, editor, img) {
          $.ajax({
            method: 'POST',
            url: '/delete_image',
            data: {
              src: img.attr('src')
            }
          })
            .done((data11) => {
              console.log('image was deleted');
            })
            .fail((err) => {
              console.log('image delete problem: ' + JSON.stringify(err));
            });
        },
        'froalaEditor.file.unlink': function (e, editor, link) {
          $.ajax({
            method: 'POST',
            url: '/delete_file',
            data: {
              src: link.getAttribute('href')
            }
          })
            .done(function (data1) {
              console.log('file was deleted');
            })
            .fail(function (err) {
              console.log('file delete problem: ' + JSON.stringify(err));
            });
        },
        'froalaEditor.video.removed': function (e, editor, video) {
          $.ajax({
            method: 'POST',
            url: '/delete_video',
            data: {
              src: video.getAttribute('src')
            }
          })
            .done(function (data2) {
              console.log('file was deleted');
            })
            .fail(function (err) {
              console.log('file delete problem: ' + JSON.stringify(err));
            });
        }
      }
    };
  }

  ngOnInit() {
    // 根据id获取对应文章信息
    // this.articleApi.getArticleById(this.data.id).subscribe(
    //   result => {
    //   }
    // );
  }

  /**
   * 提交数据
   */
  doPost() {
    const confirmDialogRef = this.dialog.open(AddConfirmDialogComponent);
    confirmDialogRef.componentInstance.doConfirm.subscribe(() => {
      // dosomething
      // 如果文章的图片路径变了，则重新发起文件上传请求
      // if (this.article.imgUrl !== this.imgUrl) {
      //   this.articleApi.uploadFile(this.imgData).subscribe(
      //     data => {
      //       // 更新文章图片路径
      //     },
      //     error => {
      //       // 错误提示
      //     }
      //   );
      // }
      // 上传文章数据
      // this.articleApi.addArticle(null);
    });
  }

  /**
   * 上传图片时相应操作
   * @param event
   */
  onchangeSelectFile(event) {
    const file = event.target.files[0];
    this.imgData.append('file', file); // 图片数据保存
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)); // 图片数据转换为预览URL
    $('#filename').html(file.name); // 显示上传图片名
    console.log(file);
  }

  /**
   * 文章状态更改
   * @param event
   */
  statusChange(event) {
    if (event.checked) {
      this.status = '启用';
    } else {
      this.status = '禁用';
    }
    console.log(event);
  }
}
