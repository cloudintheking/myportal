import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddArticleDialogComponent} from '../article-manage/add-article-dialog/add-article-dialog.component';

@Component({
  selector: 'app-home-manage',
  templateUrl: './home-manage.component.html',
  styleUrls: ['./home-manage.component.css']
})
export class HomeManageComponent implements OnInit {

  articles: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sortTable: MatSort;
  totalCount: number;
  currentPage: PageEvent;
  currentSort: Sort;

  interest: any[] = [
    {name: 'a', id: 1},
    {name: 'b', id: 1},
    {name: 'c', id: 1},
    {name: 'd', id: 1}
  ];

  parents: any[] = [
    {
      name: '球类',
      childs: [
        {name: '桌球', id: 1},
        {name: '足球', id: 2},
        {name: '篮球', id: 3}
      ]
    },
    {
      name: '其他',
      childs: [
        {name: '游泳', id: 4},
        {name: '跑步', id: 5},
        {name: '拳击', id: 6}
      ]
    }
  ];

  constructor(private articleApi: BackApiService, private dialog: MatDialog) {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    this.currentSort = {
      active: '',
      direction: ''
    };
  }

  ngOnInit() {
    this.getArticles();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getArticles();
    });

  }

  getArticles() {
    this.articleApi.getArticles(this.currentPage, this.currentSort).subscribe(data => {
      this.articles.data = data.items;
      this.totalCount = data.total_count;
      this.articles.sort = this.sortTable;
      //  this.articles.paginator = this.paginator;
    });
  }

  reply(emailRow) {
    console.log('回覆信件', emailRow);
  }

  delete(emailRow) {
    console.log('刪除信件', emailRow);
  }

  changeSort(sortInfo: Sort) {
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    this.getArticles();
  }

  showArticleDialog() {
    this.dialog.open(AddArticleDialogComponent, {
      width: '80%',
      data: {id: 1 }
    });
  }

}
