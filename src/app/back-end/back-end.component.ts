import {Component, OnInit} from '@angular/core';
import { faHandPointRight } from '@fortawesome/free-regular-svg-icons';
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
export class BackEndComponent implements OnInit {
  menuItem: String = 'logo管理';
  faHandPointRight = faHandPointRight;
  constructor() {
  }

  ngOnInit() {
  }

  showMenuItem(event) {
    this.menuItem = event;
  }
}
