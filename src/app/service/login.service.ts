import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

/**
 * @author hl
 * @date 2018/8/1
 * @Description: 登陆验证服务
 */
@Injectable()
export class LoginService {
  private userData: any; // 全局用户信息
  constructor(private http: HttpClient) {
  }

  set User(user) {
    this.userData = user;
  }

  get User() {
    return this.userData;
  }

  /**
   * 登陆
   * @param {User} value
   * @returns {Observable<any>} 登陆返回信息
   */
  login(value: User): Observable<any> {
    const param: HttpParams = new HttpParams();
    param.append('user', value.name);
    param.append('password', value.password);
    return this.http.get('', {params: param});
  }
}

// 用户登陆接口
export class User {
  name: string;
  password: string;
}
