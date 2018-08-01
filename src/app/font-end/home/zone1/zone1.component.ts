import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-zone1',
  templateUrl: './zone1.component.html',
  styleUrls: ['./zone1.component.css']
})
export class Zone1Component implements OnInit, AfterViewInit ,OnChanges {

  @Input()
  scrollid: string;

  butupId: string;
  butdownId: string;
  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    $('#' + this.scrollid).Scroll({line: 1, speed: 300, timer: 3000, up: this.butupId, down: this.butdownId});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.butdownId = 'butdown' + this.scrollid;
    this.butupId = 'butup' + this.scrollid;
  }
}
