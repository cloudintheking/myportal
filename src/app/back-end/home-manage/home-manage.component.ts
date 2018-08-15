import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddHomeDialogComponent} from './add-home-dialog/add-home-dialog.component';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';

@Component({
  selector: 'app-home-manage',
  templateUrl: './home-manage.component.html',
  styleUrls: ['./home-manage.component.css']
})
export class HomeManageComponent implements OnInit {

  homeModules: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator; // 分页
  @ViewChild(MatSort) sortTable: MatSort; // 排序
  currentPage: PageEvent; // 当前分页信息
  currentSort: any; // 当前排序信息
  paramsForm: FormGroup;

  constructor(private homeApi: BackApiService, private dialog: MatDialog) {
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
      moduleType: [],
      hide: []
    });
  }

  ngOnInit() {
    this.getModules();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getModules();
    });
    this.homeModules.sort = this.sortTable;
  }

  getModules() {
    console.log('表单参数', this.paramsForm.value);
    console.log('分页参数', this.currentPage);
    console.log('排序参数', this.currentSort);
    const params = {
      moduleType: this.paramsForm.value.moduleType,
      hide: this.paramsForm.value.hide,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortField: this.currentSort.sortField,
      sortOrder: this.currentSort.sortOrder
    };
    this.homeApi.getModules(params)
      .map(res => {
        res.data.list.map(m => {
          if (m.articleType) {
            m.articleType = m.articleType.name;
          }
          return m;
        });
        return res;
      })
      .subscribe(result => {
        this.homeModules.data = result.data.list;
        this.paginator.length = result.data.total;
      });
  }

  /**
   *更新排序条件,并刷新数据
   * @param {Sort} sortInfo
   */
  changeSort(sortInfo: Sort) {
    this.currentSort.sortField = sortInfo.active;
    this.currentSort.sortOrder = sortInfo.direction;
    this.getModules();
  }

  /**
   * 编辑首页模块
   * @param {string} id
   */
  editModule(id?: string) {
    this.dialog.open(AddHomeDialogComponent, {
      width: '50%',
      data: {id: id}
    });
  }

  /**
   * 根据id删除首页模块
   * @param {string} id
   */
  deleteModule(id: string) {
    this.homeApi.deleteModule(id).subscribe(
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
            message: error1.toString()
          }
        });
      }
    );
  }


}
