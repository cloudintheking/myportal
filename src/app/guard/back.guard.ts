import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BackApiService} from '../service/back-api.service';

/**
 * @author hl
 * @date 2018/8/1
 * @Description: 后台管理路由守卫
 */
@Injectable()
export class BackGuard implements CanActivate {
  constructor(private  loginApi: BackApiService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginApi.userData.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
}
