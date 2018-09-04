import {Component, Input, OnInit} from '@angular/core';
import {BackApiService} from '../../../service/back-api.service';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-zone3',
  templateUrl: './zone3.component.html',
  styleUrls: ['./zone3.component.css']
})
export class Zone3Component implements OnInit {
  @Input()
  module: any; // 父组件传递过来的模块信息
  categories: any[]; // 栏目列表
  L1: any; // 一级栏目id
  articles: any[]; // 文章列表
  fileUrl = environment.fileUrl; // 文件系统域名

  constructor(private zoneApi: BackApiService, private  router: Router) {
  }

  ngOnInit() {
    this.getTitles();
  }

  /**
   * 栏目列表
   */
  getTitles() {
    this.zoneApi.getCategoryById(
      {
        id: this.module.category.id,
        showChilds: true,
        byShow: true,
        deep: 2
      }
    ).subscribe(
      success => {
        if (success.status === 1) {
          if (success.data.level === 1) {
            this.categories = success.data.childs;
            this.L1 = success.data.id;
            console.log('这是一级模块', success);
          } else {
            this.categories.push(success.data);
            this.L1 = success.data.pid;
            console.log('这是二级模块', success);
          }
          this.showArticles(this.categories[0].id);
        }
      });
  }

  /**
   *文章列表
   * @param title
   */
  showArticles(categoryId) {
    const params = {
      category: categoryId,
      pageIndex: 0,
      pageSize: 3
    };
    this.zoneApi.getArticlesPageAnon(params).subscribe(
      success => {
        if (success.status === 1) {
          this.articles = success.data.content.map(a => {
            a.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + a.cover;
            return a;
          });
        }
      });
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
