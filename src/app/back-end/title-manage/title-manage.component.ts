import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddTitleDialogComponent} from './add-title-dialog/add-title-dialog.component';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {DeleteTitleDialogComponent} from './delete-title-dialog/delete-title-dialog.component';

/**
 * @author hl
 * @date 2018/8/2
 * @Description: 栏目管理组件
 */
@Component({
  selector: 'app-title-manage',
  templateUrl: './title-manage.component.html',
  styleUrls: ['./title-manage.component.css']
})
export class TitleManageComponent implements OnInit {
  titles: MatTableDataSource<any> = new MatTableDataSource<any>(); // 文章列表数据源
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sortTable: MatSort;
  totalCount: number;
  currentPage: PageEvent;
  currentSort: any;
  params: FormGroup; // 查询参数
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

  constructor(private titleApi: BackApiService, private dialog: MatDialog) {
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
  }

  ngOnInit() {
    this.getTitles();
    this.titles.sort = this.sortTable;
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
    // this.currentSort = sortInfo;
    // this.getTitles();
  }

  /**
   * 打开弹窗
   */
  showTitleDialog(id?: any) {
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
