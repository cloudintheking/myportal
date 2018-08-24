import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Http} from '@angular/http';
/*
 * @Author: hl
 * @Date: 2018-07-26 14:44:59
 * @Last Modified by:   hl
 * @Last Modified time: 2018-07-26 14:44:59
 */

@Injectable()
export class OtherResolveService implements Resolve<any> {

  menuData: any;
  constructor(private router: Router, private http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return undefined;
  }

}
