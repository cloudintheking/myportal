import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddTitleDialogComponent} from './add-category-dialog/add-title-dialog.component';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {DeleteTitleDialogComponent} from './delete-category-dialog/delete-title-dialog.component';

/**
 * @author hl
 * @date 2018/8/2
 * @Description: 栏目管理组件
 */
@Component({
  selector: 'app-title-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.css']
})
export class CategoryManageComponent implements OnInit {
  titles: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator;
  totalCount: number;
  currentPage: PageEvent;
  currentSort: any; // 保存排序信息
  params: FormGroup; // 查询参数
  constructor(private titleApi: BackApiService, private dialog: MatDialog, private matPaginatorIntl: MatPaginatorIntl) {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      sortField: '',
      sortOrder: ''
    };
    this.params = new FormBuilder().group({
      typeLevel: [],
      displayStyle: [],
      inNavigationBar: []
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
    this.getTitles();
    // this.titles.sort = this.sortTable; 本地排序
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getTitles();
    });
  }

  /**
   * 获取栏目信息
   */
  getTitles() {
    console.log('表单参数', this.params.value);
    console.log('分页参数', this.currentPage);
    console.log('排序参数', this.currentSort);
    const params = {
      typeLevel: this.params.value.typeLevel,
      displayStyle: this.params.value.displayStyle,
      inNavigationBar: this.params.value.inNavigationBar,
      pageIndex: this.currentPage.pageIndex,
      pageSize: this.currentPage.pageSize,
      sortField: this.currentSort.sortField,
      sortOrder: this.currentSort.sortOrder
    };
    this.titleApi.getAllTitles(params)
      .map(res => {
        res.data.list.map(v => {
            switch (v.displayStyle) {
              case '1':
                v.displayStyle = '列表';
                break;
              case '2':
                v.displayStyle = '九宫格';
                break;
              default:
                v.displayStyle = '無';
                break;
            }
            return v;
          }
        );
        return res;
      })
      .subscribe(res => {
        this.titles.data = res.data.list;
        this.totalCount = res.data.total;
        //  this.titles.sort = this.sortTable;
      });
  }

  /**
   * 改变排序信息
   * @param {Sort} sortInfo
   */
  changeSort(sortInfo: Sort) {
    this.currentSort.sortField = sortInfo.active;
    this.currentSort.sortOrder = sortInfo.direction;
    this.getTitles();
  }

  /**
   * 打开弹窗
   */
  editTitle(id?: any) {
    console.log(id);
    const currentdialog1 = this.dialog.open(AddTitleDialogComponent, {
      width: '50%',
      data: {id: id}
    });
    currentdialog1.componentInstance.doConfirm.subscribe(() => {
      this.getTitles(); // 更新数据
    });
  }

  /**
   * 删除title
   * @param titleRow
   */
  deleteTitle(titleRow) {
    const currentdialog2 = this.dialog.open(DeleteTitleDialogComponent, {
      width: '50%',
      data: {
        id: titleRow.id
      }
    });
    currentdialog2.componentInstance.doConfirm.subscribe(() => {
      this.getTitles(); // 更新数据
    });
  }

  /**
   * 更新栏目状态
   * @param event
   * @param data 行数据
   */
  updateTitleStatus(event, data) {
    data.inNavigationBar = event.checked;
    console.log(data);
  }

  /**
   * 更新栏目
   */
  updateTitle() {
    this.titleApi.updateTitle(null).subscribe();
  }
}
