import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-zone1',
  templateUrl: './zone1.component.html',
  styleUrls: ['./zone1.component.css']
})
export class Zone1Component implements OnInit, AfterViewInit, OnChanges {
  @Input()
  module: any; // 父组件传递过来的模块信息
  @Input()
  scrollid: string; // 滚动界面元素id
  butupId: string; // 向上按钮元素id
  butdownId: string; // 向下按钮元素id
  navigation1: any; // 导航1
  navigation2: any; // 导航2
  articles: any[]; // 文章列表
  L1: any; // 一级栏目id
  fileUrl = environment.fileUrl; // 文件系统域名
  imgUrl: any; // 动态图片url

  constructor(private moduleApi: BackApiService, private  router: Router) {
  }

  ngOnInit() {
    console.log('module', this.module);
    this.getNavigation();
    this.getArticles();
  }

  /**
   * 获取文章列表
   */
  getArticles() {
    const params = {
      type: this.module.articleTypeId,
      pageIndex: 0,
      pageSize: 10
    };
    this.moduleApi.getArticleByTitleIdAnon(params).subscribe(
      success => {
        if (success.status === 1) {
          this.articles = success.data.list.map(a => {
            a.year = a.date.substring(0, 4);
            a.month = a.date.substring(5, 7);
            a.day = a.date.substring(8, 10);


            // a.year = a.date.split('-')[0];
            // a.month = a.date.split('-')[1];
            // a.day = a.date.split('-')[2];
            a.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + a.cover;
            return a;
          });
          this.imgUrl = this.articles[0].cover;
        }
        // this.dynamicImgUrl(this.articles);
      }
    );
  }

  /**
   * 导航信息
   */
  getNavigation() {
    if (this.module.showTypeLevel === 1) {
      this.moduleApi.getChildrenTilesAnon({typeID: this.module.articleTypeId}).subscribe(
        success => {
          if (success.status === 1) {
            this.navigation1 = success.data.name;
            this.L1 = success.data.id;
            console.log('navigation1', this.navigation1);
          }
        }
      );
    } else {
      this.moduleApi.getChildrenTilesAnon({typeID: this.module.articleTypeId})
        .switchMap(
          t => {
            this.navigation2 = t.data.name;
            return this.moduleApi.getChildrenTilesAnon({
              typeID: t.data.pid
            });
          })
        .subscribe(
          success => {
            this.navigation1 = success.data.name;
            this.L1 = success.data.id;
          }
        );
    }
  }

  ngAfterViewInit(): void {
    $('#s' + this.scrollid).Scroll({line: 1, speed: 300, timer: 3000, up: this.butupId, down: this.butdownId});
  }

  /**
   * change生命周期
   * 获取父组件传来的值
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.butdownId = 'butdown' + this.scrollid;
    this.butupId = 'butup' + this.scrollid;
    console.log(changes.scrollid);
  }

  /**
   * 文章详情
   * @param article
   */
  showArticleDetail(article) {
    this.router.navigate(['frontend/category/detail'], {
      queryParams: {
        articleID: article.id,
        L1: this.L1
      },
      skipLocationChange: false
    });
  }
}
