import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '../service/login.service';
/**
 * @author hl
 * @date 2018/8/1
 * @Description: 后台路由守卫
*/
@Injectable()
export class BackGuard implements CanActivate {
  constructor(private  loginApi: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginApi.User) {
      return true;
    } else {
      return false;
    }
  }
}
