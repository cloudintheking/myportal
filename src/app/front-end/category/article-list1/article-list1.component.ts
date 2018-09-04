import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {BackApiService} from '../../../service/back-api.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-article-list1',
  templateUrl: './article-list1.component.html',
  styleUrls: ['./article-list1.component.css']
})
export class ArticleList1Component implements OnInit {
  articleList: any[]; // 文章列表
  artcileCount: any; // 文章个数
  pageIndex = 0; // 当前页
  pageSize = 10; // 每页数据条数
  L1: any; // 一级栏目id
  L2: any; // 二级栏目id
  fileUrl = environment.fileUrl; // 文件系统域名
  navigation: any; // 导航
  constructor(private  articleApi: BackApiService, private routeinfo: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // 路由参数订阅
    this.routeinfo.queryParams
      .subscribe(level => {
        this.L1 = level.L1;
        this.L2 = level.L2;
        //   console.log('参数订阅', level);
        this.getArticles();
        this.getNavigation();
      });
  }

  /**
   *分页查询文章列表
   */
  getArticles() {
    const params = {
      category: this.L2,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize // 和paginator组件中rows值保持一致
    };
    // console.log('分页参数', params);
    this.articleApi.getArticlesPageAnon(params)
      .subscribe(
        success => {
          // console.log('总页数Init', success.data.total);
          this.artcileCount = success.data.total;
          this.articleList = success.data.content.map(a => {
            a.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + a.cover;
            return a;
          });
        }
      );
  }

  /**
   * 导航信息
   */
  getNavigation() {
    this.articleApi.getCategoryById({
      id: this.L2
    }).subscribe(
      success => {
        this.navigation = success.data.name;
      }
    );
  }

  /**
   * 分页点击事件
   * @param event
   */
  pageTo(event) {
    if (event.page !== this.pageIndex) {
      this.pageIndex = event.page;
      this.getArticles();
    }
  }

  /**
   * 展示文章详情
   * @param article
   */
  showArticleDetail(article) {
    this.router.navigate(['frontend/category/detail'], {
      queryParams: {
        articleID: article.id,
        L1: this.L1
      },
      skipLocationChange: true
    });
  }
}
