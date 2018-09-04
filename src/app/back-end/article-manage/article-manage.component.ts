import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {
  MatDialog,
  MatPaginator,
  MatPaginatorIntl,
  MatSelectChange,
  MatTableDataSource,
  PageEvent,
  Sort
} from '@angular/material';
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
  categoryTree: Observable<any>; // 树形栏目
  categoryLevel1: Observable<any>; // 一级栏目组
  levelON_OFF: Boolean = true; // 栏目等级开关
  constructor(private articleApi: BackApiService, private dialog: MatDialog, private matPaginatorIntl: MatPaginatorIntl) {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      sortField: null,
      sortOrder: null
    };
    this.paramsForm = new FormBuilder().group({
      title: [],
      category: [],
      startDate: [],
      endDate: [],
      show: []
    });
    // material paginator 中文提示
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 页、共 ${length} 个`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 个 共 ${length} 个`;
    };
    this.matPaginatorIntl.itemsPerPageLabel = '每页个数：';
    this.matPaginatorIntl.nextPageLabel = '下一页';
    this.matPaginatorIntl.previousPageLabel = '上一页';
  }

  ngOnInit() {
    this.categoryLevel1 = this.articleApi.getCategories({level: 1}).map(res => res.data);
    this.categoryTree = this.articleApi.getCategoriesTree({show: false, deep: 2}).map(res => res.data);
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
      category: this.paramsForm.value.category,
      startDate: this.paramsForm.value.startDate,
      endDate: this.paramsForm.value.endDate,
      show: this.paramsForm.value.show,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortField: this.currentSort.sortField,
      sortOrder: this.currentSort.sortOrder
    };
    console.log('查询参数', params);
    this.articleApi.getArticlesPage(params).subscribe(
      res => {
        if (res.status === 1) {
          this.articles.data = res.data.content.map(a => {
            a.categoryName = a.category.name;
            return a;
          });
          this.paginator.length = res.data.total;
          console.log('文章结果', res);
        }
      }
    );
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


  /**
   * 等级开关
   * @param $event
   */
  levelOnOff($event: MatSelectChange) {
    console.log($event);
    if ($event.value === 1) {
      this.levelON_OFF = true;
    } else {
      this.levelON_OFF = false;
    }
  }

}
