import {Component, Input, OnInit} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-zone2',
  templateUrl: './zone2.component.html',
  styleUrls: ['./zone2.component.css']
})
export class Zone2Component implements OnInit {
  @Input()
  module: any; // 父组件传递过来的模块信息
  navigation1: any; // 导航1
  navigation2: any; // 导航2
  article: any; // 文章列表
  articlesRelate: any[]; // 关联文章
  L1: any; // 一级栏目id
  fileUrl = environment.fileUrl; // 文件系统域名

  constructor(private moduleApi: BackApiService, private  router: Router) {
  }

  ngOnInit() {
    this.getNavigation();
    this.getArticles();
  }

  /**
   * 文章列表
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
          this.article = success.data.list.slice(0, 1)[0];
          this.article.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + this.article.cover;
          this.getRelateArticles(this.article.id);
        }
      }
    );
  }

  /**
   * 获取关联文章信息
   */
  getRelateArticles(relateId) {
    console.log('zone2 articleID', relateId);
    this.moduleApi.getRelateArticlesAnon({id: relateId}).subscribe(
      success => {
        if (success.status === 1) {
          this.articlesRelate = success.data;
        }
      });
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

  /**
   * 文章详情
   * @param article
   */
  showArticleDetail(article) {
    console.log('zone2夜传送文章信息', article);
    this.router.navigate(['frontend/other/detail'], {
      queryParams: {
        articleID: article.id,
        L1: this.L1
      },
      skipLocationChange: true
    });
  }
}
