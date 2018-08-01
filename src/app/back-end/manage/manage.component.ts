import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  menus: any = [
    {
      name: 'logo管理',
      route: './logo'
    },
    {
      name: '栏目管理',
      route: './title'
    },
    {
      name: '首页模块管理',
      route: './home'
    },
    {
      name: '文章管理',
      route: './article'
    },
    {
      name: '脚注管理',
      route: './footer'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
