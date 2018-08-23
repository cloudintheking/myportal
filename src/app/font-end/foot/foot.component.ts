import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackApiService} from '../../service/back-api.service';
import {MatSelectChange} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent implements OnInit {
  linkGroup: Observable<any>; // 链接组
  foot: string; // 脚注

  constructor(private footApi: BackApiService, private router: Router) {
  }

  ngOnInit() {
    this.linkGroup = this.footApi.getLinkGroupAnon().map(res => res.data.linkGroup);
    this.footApi.getHeaderImgsAnon().subscribe(
      success => {
        this.foot = success.prop.tailText;
      }
    );
  }

  /**
   * 链接下拉框点击事件
   * @param {MatSelectChange} event
   */
  selectChange(event) {
    window.location.href = encodeURI(event.target.value);
    console.log(event.target.value);
  }
}
