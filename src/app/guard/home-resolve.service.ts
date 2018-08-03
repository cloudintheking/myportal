import { Injectable } from '@angular/core';
import {HomeApiService} from '../service/home-api.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class HomeResolveService implements Resolve<any> {

  zoneData: any;
  constructor(private homeApi: HomeApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return undefined;
  }

}
