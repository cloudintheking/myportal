import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackApiService} from '../service/back-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private  router: Router, private  back: BackApiService) {
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
  }

  login(value) {
     this.back.test.emit(value);
    this.router.navigate(['/backend/home']);
    // console.log(value);
  }

}
