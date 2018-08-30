import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddZoneDialogComponent} from './add-zone-dialog/add-zone-dialog.component';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';

@Component({
  selector: 'app-home-manage',
  templateUrl: './zone-manage.component.html',
  styleUrls: ['./zone-manage.component.css']
})
export class ZoneManageComponent implements OnInit {
  homeModules: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator; // 分页
  @ViewChild(MatSort) sortTable: MatSort; // 排序
  currentPage: PageEvent; // 当前分页信息
  currentSort: any; // 当前排序信息
  paramsForm: FormGroup;

  constructor(private homeApi: BackApiService, private dialog: MatDialog, private matPaginatorIntl: MatPaginatorIntl) {
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
    this.getModules();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getModules();
    });
    this.sortTable.sortChange.subscribe((sort: Sort) => {
    });
    // this.homeModules.sort = this.sortTable; 静态排序
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
          if (m.articleTypeVo) {
            m.articleTypeVo = m.articleTypeVo.name;
            m.moduleType = this.transModuleTypeName(m.moduleType);
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
   * 编辑首页模块
   * @param {string} id
   */
  editModule(id?: string) {
    const editDialog = this.dialog.open(AddZoneDialogComponent, {
      width: '50%',
      data: {id: id}
    });
    editDialog.componentInstance.doConfirm.subscribe(
      () => {
        this.getModules(); // 刷新数据
      }
    );
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
      },
      () => {
        this.getModules(); // 刷新数据
      }
    );
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
   * 模块风格名转换
   * @param type
   * @returns {string}
   */
  transModuleTypeName(type: number): string {
    switch (type) {
      case 0:
        return '滚动';
      case 1:
        return '报文';
      case 2:
        return '平铺';
      default:
        return '';
    }
  }

}
