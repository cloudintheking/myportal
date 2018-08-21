import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackApiService} from '../../../service/back-api.service';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleID: any; // 文章ID
  articleData: any; // 文章信息
  fileUrl = environment.fileUrl; // 文件系统域名

  constructor(private  routerInfo: ActivatedRoute, private articleApi: BackApiService) {
  }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(a => {
      this.articleID = a.articleID;
      this.getArticleDetail();
    });
  }

  /**
   * 获取文章详情
   */
  getArticleDetail() {
    const params = {
      articleID: this.articleID
    };
    console.log('详情页接收文章id', this.articleID);
    this.articleApi.getArticleByIdAnon(params).subscribe(
      res => {
        this.articleData = res.data;
        this.articleData.cover = this.articleData.cover;
      });
  }

}
