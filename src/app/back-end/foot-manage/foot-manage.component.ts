import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialog, MatTableDataSource} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AddLinkDialogComponent} from './add-link-dialog/add-link-dialog.component';
import {BackApiService} from '../../service/back-api.service';
import {Observable} from 'rxjs/Observable';
import {AddConfirmDialogComponent} from '../../common-components/add-confirm-dialog/add-confirm-dialog.component';

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
  options: object; // 富文本配置
  linkDataSource = new MatTableDataSource<any>();
  separatorKeysCodes = [ENTER, COMMA];
  linkGroup: Observable<any>; // 链接组
  user: Number = 3;
  testData: any[] = [
    {
      id: 1, name: 'a', address: 'a', updateBy: 'a', group: 'js'
    },
    {
      id: 2, name: 'b', address: 'b', updateBy: 'b', group: 'python'
    },
    {
      id: 3, name: 'c', address: 'c', updateBy: 'c', group: 'c++'
    },
    {
      id: 4, name: 'd', address: 'd', updateBy: 'd', group: 'java'
    }
  ];
  tags: any[];

  constructor(private  dialog: MatDialog, private  footApi: BackApiService) {
    this.options = this.footApi.froalaOptions;
    this.linkDataSource.data = this.testData;
  }

  ngOnInit() {
    this.linkGroup = this.footApi.getLinkGroup().map(res => res.data);
    this.testData.map((value, index) => {
      if (value.id !== this.user) {
        value.auth = false;
      } else {
        value.auth = true;
      }
      return value;
    });
  }

  /**
   * 删除组标签
   * @param tageName
   */
  removeTag(removeTage) {
    this.tags = this.tags.filter(tag => tag.name !== removeTage.name);
    console.log(this.tags);
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
        }
      );
    }
  }

  /**
   * 更新链接
   * @param value
   */
  update(value) {
    this.dialog.open(AddLinkDialogComponent, {
      width: '50%',
      data: {
        id: value.id
      }
    });
  }
}
