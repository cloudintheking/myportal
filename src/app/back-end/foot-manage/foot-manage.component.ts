import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

/**
 * @author hl
 * @date 2018/8/3
 * @Description: 脚注管理组件
 */
@Component({
  selector: 'app-foot-manage',
  templateUrl: './foot-manage.component.html',
  styleUrls: ['./foot-manage.component.css']
})
export class FootManageComponent implements OnInit {
  options: object; // 富文本配置
  linkDataSource = new MatTableDataSource<any>();
  user: Number = 3;
  testData: any[] = [
    {
      id: 1, name: 'a', address: 'a', updateBy: 'a'
    },
    {
      id: 2, name: 'b', address: 'b', updateBy: 'b'
    },
    {
      id: 3, name: 'c', address: 'c', updateBy: 'c'
    },
    {
      id: 4, name: 'd', address: 'd', updateBy: 'd'
    }
  ];

  constructor() {
    this.options = {
      placeholder: 'Edit Me',
      height: 500,
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
    this.linkDataSource.data = this.testData;
  }

  ngOnInit() {
    this.testData.map((value, index) => {
      if (value.id !== this.user) {
        value.auth = false;
      } else {
        value.auth = true;
      }
      return value;
    });
  }

}
