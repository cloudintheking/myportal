import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {
  MatDialog,
  MatPaginator,
  MatPaginatorIntl,
  MatSort,
  MatTableDataSource,
  PageEvent,
  Sort
} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddZoneDialogComponent} from './add-zone-dialog/add-zone-dialog.component';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';

@Component({
  selector: 'app-home-manage',
  templateUrl: './zone-manage.component.html',
  styleUrls: ['./zone-manage.component.css']
})
export class ZoneManageComponent implements OnInit {
  zones: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator; // 分页
  @ViewChild(MatSort) sortTable: MatSort; // 排序
  currentPage: PageEvent; // 当前分页信息
  currentSort: any; // 当前排序信息
  paramsForm: FormGroup;

  constructor(private zoneApi: BackApiService, private dialog: MatDialog, private matPaginatorIntl: MatPaginatorIntl) {
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
      style: [],
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
    this.getZones();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getZones();
    });
    this.sortTable.sortChange.subscribe((sort: Sort) => {
    });
    // this.zones.sort = this.sortTable; 静态排序
  }

  getZones() {
    console.log('表单参数', this.paramsForm.value);
    console.log('分页参数', this.currentPage);
    console.log('排序参数', this.currentSort);
    const params = {
      style: this.paramsForm.value.style,
      show: this.paramsForm.value.show,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortField: this.currentSort.sortField,
      sortOrder: this.currentSort.sortOrder
    };
    console.log('zone查询参数', params);
    this.zoneApi.getZonesPage(params)
      .map(res => {
        res.data.content.map(m => {
          m.categoryName = m.category.name;
          m.style = this.transZoneStyleName(m.style);
          return m;
        });
        return res;
      })
      .subscribe(result => {
        this.zones.data = result.data.content;
        this.paginator.length = result.data.total;
      });
  }

  /**
   * 编辑首页模块
   * @param {string} id
   */
  editZone(id?: string) {
    const editDialog = this.dialog.open(AddZoneDialogComponent, {
      width: '50%',
      data: {id: id}
    });
    editDialog.componentInstance.doConfirm.subscribe(
      () => {
        this.getZones(); // 刷新数据
      }
    );
  }

  /**
   * 根据id删除首页模块
   * @param {string} id
   */
  deleteZone(id: string) {
    this.zoneApi.deleteZone(id).subscribe(
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
        this.getZones(); // 刷新数据
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
    this.getZones();
  }

  /**
   * 模块风格名转换
   * @param type
   * @returns {string}
   */
  transZoneStyleName(type: number): string {
    switch (type) {
      case 1:
        return '滚动';
      case 2:
        return '报文';
      case 3:
        return '平铺';
      default:
        return '';
    }
  }

}
