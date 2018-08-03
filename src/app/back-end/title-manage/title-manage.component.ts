import {Component, OnInit, ViewChild} from '@angular/core';
import {BackApiService} from '../../service/back-api.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {AddTitleDialogComponent} from './add-title-dialog/add-title-dialog.component';
import 'rxjs/add/operator/map';

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

  constructor(private titleApi: BackApiService, private dialog: MatDialog) {
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
    // this.getTitles();
    this.titles.data = [
      {id: 1, name: '企业文化', level: 1, updateBy: 'admin', status: 1},
      {id: 2, name: '企业文化', level: 2, updateBy: 'admin', status: 0},
      {id: 3, name: '企业文化', level: 3, updateBy: 'admin', status: 1}
    ];
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
    this.titleApi.getTitles(null)
      .map(title => {
        if (title.level === 1) {
          title.level = '一级';
        } else {
          title.level = '二级';
        }
        return title;
      })
      .subscribe(data => {
        // this.titles.data = data.items;
        this.totalCount = data.total_count;
        this.titles.sort = this.sortTable;
      });
  }

  /**
   * 删除title
   * @param titleRow
   */
  delete(titleRow) {
    this.titleApi.deleteTitleById(titleRow.id);
  }

  /**
   * 改变排序信息
   * @param {Sort} sortInfo
   */
  changeSort(sortInfo: Sort) {
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
   // this.getTitles();
  }

  /**
   * 打开弹窗
   */
  showTitleDialog(id?: number) {
    this.dialog.open(AddTitleDialogComponent, {
      width: '50%',
      data: {id: id}
    });
  }

}
