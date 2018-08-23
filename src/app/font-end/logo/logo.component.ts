import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackApiService} from '../../service/back-api.service';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  headerImgs: Observable<any>; // 背景图片组
  fileUrl = environment.fileUrl; // 文件系统域名

  constructor(private  logoApi: BackApiService) {
  }

  ngOnInit() {
    this.headerImgs = this.logoApi.getHeaderImgsAnon().map(res => {
      return res.prop.headImg.map(h => {
        return h = this.fileUrl + '/japi/filesystem/getFile?id=' + h;
      });
    });
  }
}
