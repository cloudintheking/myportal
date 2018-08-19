import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-zone3',
  templateUrl: './zone3.component.html',
  styleUrls: ['./zone3.component.css']
})
export class Zone3Component implements OnInit, OnChanges {
  @Input()
  title: any; // 栏目信息

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
