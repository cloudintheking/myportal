import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/observable';

/**
 * @author hl
 * @date 2018/7/26
 * @Description:
 */

@Injectable()
export class HomeApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * 获取首页模块标题信息
   * @returns {Observable<any>}
   */
  getZones(): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.append('type', '首页');
    return this.http.get('xxx', {params: params});
  }

  /**
   * 获取栏目内文章信息
   * @param {string} type :栏目的类型
   * @returns {Observable<any>}
   */
  getArticles(type: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.append('type', type);
    return this.http.get('xxx', {});
  }

}
