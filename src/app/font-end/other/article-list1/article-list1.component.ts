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
  // articleTemp: any[] = [
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   },
  //   {
  //     img: 'assets/img/tu2.jpg',
  //     sub: '褚银良副市长督查环城南路东段快速化改褚银良副市长督查环城南路东段快速化改...',
  //     date: '2018-06-28',
  //     content: '1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、' +
  //     '建而不快”问题。城投公司总经理周宏伟陪同1月8日下午，褚银良副市长到环城南路东段快速化改造工程现场，督查中心城区建设用地“围而未建、建而不快”问题。城投公司总经理周宏伟陪同...'
  //   }
  // ];

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
      });
    this.articleApi.titleL2Emitter.subscribe(
      success => {
        this.L2 = success;
        this.getArticles();
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
    // console.log('分页参数', params);
    this.articleApi.getArticleByTitleIdAnon(params)
      .subscribe(
        success => {
          // console.log('总页数Init', success.data.total);
          this.artcileCount = success.data.total;
          this.articleList = success.data.list.map(a => {
            a.cover = this.fileUrl + '/japi/filesystem/getFile?id=' + a.cover;
            return a;
          });
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
    this.router.navigate(['frontend/other/detail'], {
      queryParams: {
        articleID: article.id,
        L1: this.L1
      },
      skipLocationChange: true
    });
  }
}
