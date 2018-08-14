import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faAngry, faNewspaper} from '@fortawesome/free-regular-svg-icons';
import {faShoePrints, faColumns, faCube} from '@fortawesome/free-solid-svg-icons';
/**
 * @author hl
 * @date 2018/8/3  菜单组件
 * @Description:
*/
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  @Output()
  menuItem: EventEmitter<any> = new EventEmitter<any>(); // 菜单项分发器
  menus: any[] = [
    {
      name: 'logo管理',
      route: './logo',
      icon: faAngry
    },
    {
      name: '栏目管理',
      route: './title',
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

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 分发菜单选择项
   * @param event
   */
  menuitem(event) {
    this.menuItem.emit(event.target.innerText);
  }
}
