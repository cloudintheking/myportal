import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

/**
 * @author hl
 * @date 2018/8/1
 * @Description: 登陆组件
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private  router: Router, private loginApi: LoginService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  /**
   * 登陆
   * @param user
   */
  login(user) {
    // this.loginApi.login(user).subscribe(
    //   data => {
    //     this.loginApi.User = data;
    //     this.router.navigate(['/backend/home']);
    //   },
    //   error => {
    //   },
    //   () => {
    //   }
    // );
    console.log(user);
    if (user.username === 'admin' && user.password === '123') {
      this.loginApi.User = user;
    }

    this.router.navigate(['/backend/logo']);
    // window.location.href = 'http://112.16.169.54:8025/neibu.html';
  }

}
