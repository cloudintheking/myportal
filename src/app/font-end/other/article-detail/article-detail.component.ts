import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackApiService} from '../../../service/back-api.service';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleID: any; // 文章ID
  articleData: any; // 文章信息
  fileUrl = environment.fileUrl; // 文件系统域名
  relateArticles: Observable<any>; // 关联文章信息
  L1: any; // 一级栏目id

  constructor(private  routerInfo: ActivatedRoute, private articleApi: BackApiService, private  router: Router) {
  }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(a => {
      this.articleID = a.articleID;
      this.L1 = a.L1;
      this.getArticleDetail();
      this.getRelateArticles();
    });
  }

  /**
   * 获取文章详情
   */
  getArticleDetail() {
    const params = {
      articleID: this.articleID
    };
    this.articleApi.getArticleByIdAnon(params).subscribe(
      res => {
        this.articleData = res.data;
        this.articleData.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + this.articleData.cover;
      });
  }

  /**
   * 获取关联文章信息
   */
  getRelateArticles() {
    const params = {
      id: this.articleID
    };
    this.relateArticles = this.articleApi.getRelateArticlesAnon(params).map(res => res.data);
  }

  /**
   * 展示文章详情
   * @param article
   */
  showArticleDetail(articleid) {
    this.router.navigate(['frontend/other/detail'], {
      queryParams: {
        articleID: articleid,
        L1: this.L1
      },
      skipLocationChange: true
    });
  }
}
