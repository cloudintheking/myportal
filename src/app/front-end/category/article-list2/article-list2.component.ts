import {Component, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {BackApiService} from '../../../service/back-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-list2',
  templateUrl: './article-list2.component.html',
  styleUrls: ['./article-list2.component.css']
})
export class ArticleList2Component implements OnInit {
  articleList: any[]; // 文章列表
  artcileCount: any; // 文章个数
  pageIndex = 0; // 当前页
  pageSize = 10; // 每页数据条数
  L1: any; // 一级栏目id
  L2: any; // 二级栏目id
  fileUrl = environment.fileUrl; // 文件系统域名
  navigation: any; // 导航
  constructor(private  articleApi: BackApiService, private routerInfo: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      title => {
        this.L2 = title.L2;
        this.L1 = title.L1;
        this.getArticles();
        this.getNavigation(this.L2);
      }
    );
  }

  /**
   *分页查询文章列表
   */
  getArticles() {
    const params = {
      type: this.L2,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize // 和paginator组件中rows值保持一致
    };
    console.log('分页参数', params);
    this.articleApi.getArticleByTitleIdAnon(params)
      .subscribe(
        success => {
          console.log('总页数Init', success.data.total);
          this.artcileCount = success.data.total;
          this.articleList = success.data.list.map(a => {
            a.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + a.cover;
            return a;
          });
        }
      );
  }

  /**
   * 导航信息
   */
  getNavigation(ID) {
    this.articleApi.getChildrenTilesAnon({
      typeID: ID
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
    this.pageIndex = event.page;
    this.getArticles();
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
