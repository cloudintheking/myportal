import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackApiService} from '../service/back-api.service';

/**
 * @author hl
 * @date 2018/8/24
 * @Description: 首页路由解析
 */
@Injectable()
export class HomeResolveService implements Resolve<any> {

  zoneData: any;

  constructor(private homeApi: BackApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return undefined;
  }

}
