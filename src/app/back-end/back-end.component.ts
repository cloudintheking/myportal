import {Component, OnDestroy, OnInit} from '@angular/core';
import {faHandPointRight} from '@fortawesome/free-regular-svg-icons';
import {LoginService} from '../service/login.service';

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
  menuItem: String = 'logo管理';
  faHandPointRight = faHandPointRight;

  constructor(private loginApi: LoginService ) {
  }

  ngOnInit() {
  }

  showMenuItem(event) {
    this.menuItem = event;
  }

  ngOnDestroy(): void {
  // localStorage.removeItem('state');
  }
}
