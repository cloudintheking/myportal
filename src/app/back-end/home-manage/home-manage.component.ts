import { Component, OnInit } from '@angular/core';
import {BackApiService} from '../../service/back-api.service';

@Component({
  selector: 'app-home-manage',
  templateUrl: './home-manage.component.html',
  styleUrls: ['./home-manage.component.css']
})
export class HomeManageComponent implements OnInit {

  constructor(private  back: BackApiService) { }

  ngOnInit() {
    this.back.test.subscribe(data => {
      console.log(data);
    });
  }

}
