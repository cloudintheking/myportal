import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddArticleDialogComponent} from './add-article-dialog/add-article-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.css']
})
export class ArticleManageComponent implements OnInit {
  articles: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator;
  currentPage: PageEvent; // 分页信息
  currentSort: any; // 排序信息
  paramsForm: FormGroup; // 查询条件表单
  titleList: Observable<any>; // 栏目组
  constructor(private articleApi: BackApiService, private dialog: MatDialog) {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      sortField: '',
      sortOrder: ''
    };
    this.paramsForm = new FormBuilder().group({
      title: [],
      type: [],
      dateStart: [],
      dateEnd: [],
      hide: []
    });
  }

  ngOnInit() {
    this.titleList = this.articleApi.getTitlesTree({navBar: false}).map(res => res.data);
    this.getArticles();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getArticles();
    });

  }

  /**
   * 多条件查询文章信息
   */
  getArticles() {
    const params = {  // 查询参数
      title: this.paramsForm.value.title,
      type: this.paramsForm.value.type,
      dateStart: this.paramsForm.value.dateStart,
      dateEnd: this.paramsForm.value.dateEnd,
      hide: this.paramsForm.value.hide,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortField: this.currentSort.sortField,
      sortOrder: this.currentSort.sortOrder
    };
    console.log('查询参数', params);
    this.articleApi.getArticles(params).subscribe(res => {
      this.articles.data = res.data.list;
      this.paginator.length = res.data.total;
    });
  }

  /**
   * 编辑文章
   * @param {string} id
   */
  editArticle(id?: string) {
    const editDialog = this.dialog.open(AddArticleDialogComponent, {
      width: '70%',
      data: {
        id: id
      }
    });
    editDialog.componentInstance.doConfirm.subscribe(
      success => {
        this.getArticles(); // 刷新数据
      }
    );
  }

  /**
   * 根据id删除文章
   * @param {string} id
   */
  deleteArticle(id: string) {
    this.articleApi.deleteArticleByID(id).subscribe(
      success => {
        this.dialog.open(AddConfirmDialogComponent, {
          width: '50%',
          data: {
            message: success.message
          }
        });
      },
      error1 => {
        this.dialog.open(AddConfirmDialogComponent, {
          width: '50%',
          data: {
            message: error1.message
          }
        });
      },
      () => {
        this.getArticles();
      }
    );
  }

  /**
   * 记录排序信息
   * @param {Sort} sortInfo
   */
  changeSort(sortInfo: Sort) {
    this.currentSort.sortField = sortInfo.active;
    this.currentSort.sortOrder = sortInfo.direction;
    this.getArticles();
  }

}
