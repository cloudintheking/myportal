import {Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackApiService} from '../../service/back-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
  tiles = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: 'Five', cols: 1, rows: 1, color: '#22BDF1'}
  ];
  zones: Observable<any>; //  首页模块组
  constructor(private  zoneApi: BackApiService, private router: Router) {
  }

  ngOnInit() {
    this.zones = this.zoneApi.getZonesAnon({show: true}).map(res => res.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
  }

}
