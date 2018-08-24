import {Component, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AddLinkDialogComponent} from './add-link-dialog/add-link-dialog.component';
import {BackApiService} from '../../service/back-api.service';
import {Observable} from 'rxjs/Observable';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeleteLinkDialogComponent} from './delete-link-dialog/delete-link-dialog.component';
import {faUser, faComments} from '@fortawesome/free-regular-svg-icons';

/**
 * @author hl
 * @date 2018/8/3
 * @Description: 脚注管理组件
 */
@Component({
  selector: 'app-foot-manage',
  templateUrl: './foot-manage.component.html',
  styleUrls: ['./foot-manage.component.css']
})
export class FootManageComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator; // 分页信息
  @ViewChild(MatSort) sortTable: MatSort; // 排序信息
  options: object; // 富文本配置
  linkDataSource = new MatTableDataSource<any>(); // 链接数据源
  separatorKeysCodes = [ENTER, COMMA];
  linkGroup: Observable<any>; // 链接组
  linkParams: FormGroup; // 参数表单
  footOptions: any; // 脚注配置
  foot: string; // 脚注
  about: string; // 关于我们
  contact: string; // 联系我们
  /********Font Awesome Icon****************/
  faUser = faUser;
  faComments = faComments;

  /********icon****************/
  constructor(private  dialog: MatDialog, private  footApi: BackApiService) {
    this.options = this.footApi.froalaOptions;
    this.linkParams = new FormBuilder().group({
      groupId: []
    });
  }

  ngOnInit() {
    this.footApi.getHeaderImgs().subscribe(success => {
      this.footOptions = success.prop;
      this.foot = success.prop.tailText;
      this.about = success.prop.introduction;
      this.contact = success.prop.contractUs;
    });
    this.linkGroup = this.footApi.getLinkGroup().map(res => res.data);
    this.paginator.page.subscribe(
      (page: PageEvent) => {
        this.getLinks(); // 分页刷新
      }
    );
    this.sortTable.sortChange.subscribe((sort: Sort) => {
      this.getLinks(); // 排序刷新
    });
    this.getLinks();
  }

  /**
   * 获取链接
   */
  getLinks() {
    const params = {
      groupId: this.linkParams.value.groupId,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortField: this.sortTable.active,
      sortOrder: this.sortTable.direction
    };
    this.footApi.getLinks(params).subscribe(
      success => {
        this.linkDataSource.data = success.data.list;
        this.paginator.length = success.data.total;
      }
    );
  }

  /**
   * 新增链接组标签
   * @param {MatChipInputEvent} $event
   */
  addTag($event: MatChipInputEvent) {
    if (($event.value || '').trim()) {
      const params = {
        name: $event.value.trim()
      };
      this.footApi.addLinkGroup(params).subscribe(
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
          this.linkGroup = this.footApi.getLinkGroup().map(res => res.data);
        }
      );
    }
    $event.input.value = '';
  }

  /**
   * 删除组标签
   * @param tageName
   */
  removeTag(id) {
    const deleteLinkDialog = this.dialog.open(DeleteLinkDialogComponent, {
      width: '50%',
      data: {
        message: '将删除该链接组下所有链接!'
      }
    });
    deleteLinkDialog.componentInstance.doConfirm.subscribe(
      () => {
        this.footApi.deleteLinkGroup(id).subscribe(
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
            this.linkGroup = this.footApi.getLinkGroup().map(res => res.data);
            this.getLinks();
          }
        );
      });

  }

  /**
   * 更新链接
   * @param value
   */
  editLink(id?: string) {
    const editDialog = this.dialog.open(AddLinkDialogComponent, {
      width: '50%',
      data: {
        id: id
      }
    });
    editDialog.componentInstance.doConfirm.subscribe(() => {
      this.getLinks();
    });
  }

  /**
   * 根据id删除链接
   * @param {string} id
   */
  deleteLink(id: string) {
    this.footApi.deleteLinkByID(id).subscribe(
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
        this.getLinks();
      }
    );
  }

  /**
   * 更新脚注
   */
  updateFoot() {
    this.footOptions.tailText = this.foot;
    this.footOptions.introduction = this.about;
    this.footOptions.contractUs = this.contact;
    this.footApi.updateFoot(this.footOptions).subscribe(success => {
      this.dialog.open(AddConfirmDialogComponent, {
        width: '50%',
        data: {
          message: success.message
        }
      });
    });
  }
}
