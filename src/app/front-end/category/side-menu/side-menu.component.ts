import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackApiService} from '../../../service/back-api.service';
import 'rxjs/add/operator/map';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  menus: any; // 菜单组(二级栏目组)
  L1: any; // 一级栏目信息
  navigation: any; //  导航
  constructor(private  menuApi: BackApiService, private  routerInfo: ActivatedRoute, private  router: Router) {
  }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      title => {
        this.L1 = title.L1;
        console.log('菜单页接收路由参数', title);
        this.getMenus();
      }
    );
  }

  /**
   * 获取二级栏目菜单
   */
  getMenus() {
    const params = {
      id: this.L1,
      showChilds: true,
      byShow: true,
      deep: 2
    };
    this.menuApi.getCategoryById(params).subscribe(
      success => {
        this.menus = success.data.childs;
        this.navigation = success.data.name;
        console.log('菜单信息', success.data);
      }
    );
  }

  /**
   *二级栏目id分发
   * @param m
   */
  showArticles(m) {
    this.router.navigate([m.route], {
      queryParams: {
        L1: this.L1,
        L2: m.id
      },
      skipLocationChange: true
    });
  }
}
