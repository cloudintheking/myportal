import {Component, Inject, OnInit} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AddConfirmDialogComponent} from '../../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-title-dialog',
  templateUrl: './add-title-dialog.component.html',
  styleUrls: ['./add-title-dialog.component.css']
})
export class AddTitleDialogComponent implements OnInit {
  status: Boolean = true; // 状态 0:禁用, 1:启用
  statusMess: String = '启用'; // 状态提示信息
  titleList: any[] = [
    {id: 1, name: '企业文化'},
    {id: 2, name: '企业动态'},
    {id: 3, name: '企业信息'}
  ];
  options: object;
  formModel: FormGroup; // 表单数据

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private  dialog: MatDialog,
              private sanitizer: DomSanitizer, private  articleApi: BackApiService) {
    const fb: FormBuilder = new FormBuilder();
    this.formModel = fb.group({
      name: [],
      level: []
    });
    if (null) {
      this.status = true;
    } else {
      this.status = false;
    }
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
      // 上传栏目数据
      this.articleApi.addArticle(null);
    });
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
