import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faAngry, faNewspaper} from '@fortawesome/free-regular-svg-icons';
import {faShoePrints, faColumns, faCube} from '@fortawesome/free-solid-svg-icons';
import {BackApiService} from '../../service/back-api.service';

/**
 * @author hl
 * @date 2018/8/3  菜单组件
 * @Description:
 */
@Component({
  selector: 'app-manage',
  templateUrl: './back-menu.component.html',
  styleUrls: ['./back-menu.component.css']
})
export class BackMenuComponent implements OnInit {
  @Output()
  menuItem: EventEmitter<any> = new EventEmitter<any>(); // 菜单项分发器
  user: any; // 从localstorage取出用户信息
  menus: any[] = [
    {
      name: 'logo管理',
      route: './head',
      icon: faAngry
    },
    {
      name: '栏目管理',
      route: './front-side-menu',
      icon: faColumns
    },
    {
      name: '首页模块管理',
      route: './home',
      icon: faCube
    },
    {
      name: '文章管理',
      route: './article',
      icon: faNewspaper
    },
    {
      name: '脚注管理',
      route: './footer',
      icon: faShoePrints
    }
  ];

  constructor(private menuApi: BackApiService) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.menuApi.userData.getItem('user'));
    if (this.user) {
      this.menus = this.user.menuList
        .filter(m => {
          return /cms_page/.test(m.code);
        })
        .map(m => {
          m.url = encodeURI(m.url);
          m.icon = this.transIcon(m.icon);
          return m;
        });
    }
  }

  /**
   * 分发菜单选择项
   * @param event
   */
  menuitem(event) {
    this.menuItem.emit(event.target.innerText);
  }

  /**
   * icon转换
   * @param icon
   * @returns {IconDefinition}
   */
  transIcon(icon) {
    switch (icon) {
      case 'faAngry':
        return faAngry;
      case 'faColumns':
        return faColumns;
      case 'faCube':
        return faCube;
      case 'faNewspaper':
        return faNewspaper;
      case 'faShoePrints':
        return faShoePrints;
    }
  }
}
