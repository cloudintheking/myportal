import {Component, HostListener, OnInit} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.css']
})
export class RichTextComponent implements OnInit {
  contents: string; // 富文本内容
  // 监听键盘按下事件
  @HostListener('document:keydown', ['$event'])
  onkeydown(event) {
    const keyCode = event.keyCode;
    console.log(keyCode);
  }

  constructor(private richApi: BackApiService, private  routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.routerInfo.params.subscribe(data => {
      this.richApi.getOptionAnon().subscribe(
        success => {
          if (data.id === '1') {// 公司介绍
            this.contents = success.data.about;
          } else { // 联系我们
            this.contents = success.data.contact;
          }
        });

      console.log(data);
    });
  }

}
