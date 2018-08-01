import { Http } from '@angular/http';
import { Component, OnInit, Input, HostListener } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.css']
})
export class RichTextComponent implements OnInit {

  @Input()
  contents: String = ''; // 富文本内容
  options: Object = {};
  // 监听键盘按下事件
  @HostListener('document:keydown', ['$event'])
  onkeydown(event) {
    const keyCode = event.keyCode;
    console.log(keyCode);
  }
  constructor(private http: Http) {
    this.options = { // 配置信息
      placeholder: 'Edit Me',
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
            .done((data) => {
              console.log('image was deleted');
            })
            .fail((err) => {
              console.log('image delete problem: ' + JSON.stringify(err));
            });

        },
        'froalaEditor.file.unlink': function (e, editor, link) {
          $.ajax({
            // Request method.
            method: 'POST',

            // Request URL.
            url: '/delete_file',

            // Request params.
            data: {
              src: link.getAttribute('href')
            }
          })
            .done(function (data) {
              console.log('file was deleted');
            })
            .fail(function (err) {
              console.log('file delete problem: ' + JSON.stringify(err));
            });
        },
        'froalaEditor.video.removed': function (e, editor, video) {
          $.ajax({
            // Request method.
            method: 'POST',

            // Request URL.
            url: '/delete_video',

            // Request params.
            data: {
              src: video.getAttribute('src')
            }
          })
            .done(function (data) {
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
  }

}
