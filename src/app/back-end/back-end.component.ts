import {Component, OnDestroy, OnInit} from '@angular/core';
import {faHandPointRight} from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';
import {BackApiService} from '../service/back-api.service';

/**
 * @author hl
 * @date 2018/8/3
 * @Description: 后台组件
 */
@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.css']
})
export class BackEndComponent implements OnInit, OnDestroy {
  menuItem: string;
  faHandPointRight = faHandPointRight;

  constructor(private loginApi: BackApiService, private  router: Router) {
  }

  ngOnInit() {
  }

  showMenuItem(event) {
    this.menuItem = event;
  }

  ngOnDestroy(): void {
  }

  /**
   * 退出登录
   */
  loginOut() {
    this.loginApi.userData.removeItem('user');
    this.router.navigate(['/frontend/home']);
  }
}
