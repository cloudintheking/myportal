import {Injectable} from '@angular/core';
import {HomeApiService} from '../service/home-api.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

/**
 * @author hl
 * @date 2018/8/24
 * @Description: 首页路由解析
 */
@Injectable()
export class HomeResolveService implements Resolve<any> {

  zoneData: any;

  constructor(private homeApi: HomeApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return undefined;
  }

}
