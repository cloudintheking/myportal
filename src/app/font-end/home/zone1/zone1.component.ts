import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-zone1',
  templateUrl: './zone1.component.html',
  styleUrls: ['./zone1.component.css']
})
export class Zone1Component implements OnInit, AfterViewInit, OnChanges {
  @Input()
  title: any; // 关联栏目信息
  @Input()
  scrollid: string; // 滚动界面元素id
  butupId: string; // 向上按钮元素id
  butdownId: string; // 向下按钮元素id
  articleTemp: any[] = [
    {
      month: 10,
      day: 25,
      title: '市委常委、组织部部长钟关华调研宁波市委党',
      sub: '1月8日下午，褚银良副而未建、建而不快”问题。城投公司总经理周宏伟陪同督查...',
      route: '/frontend/other/1/detail'
    },
    {
      month: 10,
      day: 25,
      title: '市委常委、组织部部长钟关华调研宁波市委党',
      sub: '1月8日下午，褚银良副而未建、建而不快”问题。城投公司总经理周宏伟陪同督查...',
      route: '/frontend/other/1/detail'
    },
    {
      month: 10,
      day: 25,
      title: '市委常委、组织部部长钟关华调研宁波市委党',
      sub: '1月8日下午，褚银良副而未建、建而不快”问题。城投公司总经理周宏伟陪同督查...',
      route: '/frontend/other/1/detail'
    },
    {
      month: 10,
      day: 25,
      title: '市委常委、组织部部长钟关华调研宁波市委党',
      sub: '1月8日下午，褚银良副而未建、建而不快”问题。城投公司总经理周宏伟陪同督查...',
      route: '/frontend/other/1/detail'
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    $('#s' + this.scrollid).Scroll({line: 1, speed: 300, timer: 3000, up: this.butupId, down: this.butdownId});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.butdownId = 'butdown' + this.scrollid;
    this.butupId = 'butup' + this.scrollid;
    console.log(changes.scrollid);
  }
}
