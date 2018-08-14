import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddArticleDialogComponent} from '../article-manage/add-article-dialog/add-article-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddHomeDialogComponent} from './add-home-dialog/add-home-dialog.component';

@Component({
  selector: 'app-home-manage',
  templateUrl: './home-manage.component.html',
  styleUrls: ['./home-manage.component.css']
})
export class HomeManageComponent implements OnInit {

  articles: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator; // 分页
  @ViewChild(MatSort) sortTable: MatSort; // 排序
  totalCount: number; // 总数
  currentPage: PageEvent; // 当前分页信息
  currentSort: Sort; // 当前排序信息
  params: FormGroup;

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

    this.params = new FormBuilder().group({
      type: [],
      status: [],
      pageIndex: [],
      pageSize: []
    });
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
    this.dialog.open(AddHomeDialogComponent, {
      width: '50%',
      data: {id: 1}
    });
  }

}
