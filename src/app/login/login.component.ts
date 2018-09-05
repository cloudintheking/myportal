import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackApiService} from '../service/back-api.service';
import {MatDialog} from '@angular/material';
import {AddConfirmDialogComponent} from '../common-components/add-confirm-dialog/add-confirm-dialog.component';

/**
 * @author hl
 * @date 2018/8/1
 * @Description: 登录组件
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;

  constructor(private  router: Router, private loginApi: BackApiService, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.loginApi.userData.getItem('user')) {
      this.router.navigate(['/backend/head']);
    }
    this.loginForm = new FormBuilder().group({
      username: [],
      password: []
    });
  }

  ngAfterViewInit(): void {
  }

  /**
   * 登录
   */
  login() {
    console.log(this.loginForm);
    if (this.loginForm.value.username === 'admin' && this.loginForm.value.password === '123456') {
      this.router.navigate(['/backend/head']);
    } else {
      this.dialog.open(AddConfirmDialogComponent, {
        width: '50%',
        data: {
          message: '用户名或密码错误'
        }
      });
    }
    // this.loginApi.loginIn(this.loginForm.value).subscribe(
    //   success => {
    //     if (success.status === 1) {
    //       this.loginApi.userData.setItem('user', JSON.stringify(success.user));
    //       this.router.navigate(['/backend/head']);
    //     } else {
    //       this.dialog.open(AddConfirmDialogComponent, {
    //         width: '50%',
    //         data: {
    //           message: success.message
    //         }
    //       });
    //     }
    //   },
    //   error1 => {
    //     this.dialog.open(AddConfirmDialogComponent, {
    //       width: '50%',
    //       data: {
    //         message: error1.mesaage
    //       }
    //     });
    //   }
    // );
  }

}
