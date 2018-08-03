import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
/**
 * @author hl
 * @date 2018/8/2
 * @Description: 后台管理API
*/
@Injectable()
export class BackApiService {
  articleIdEmitter: EventEmitter<number> = new EventEmitter<number>(); // 文章id分发器
  constructor(private  http: HttpClient) {
  }

  /**
   *  文件上传
   * @param {FormData} data 文件数据
   * @returns {Observable<any[]>} 返回文件路径数组流
   */
  uploadFile(data: FormData): Observable<any[]> {
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', undefined);
    return this.http.post<any[]>('', data, {headers: header});
  }

  /**********************logo管理api******************************/

  /**********************栏目管理api******************************/
  /**
   * 获取栏目列表信息
   * @returns {Observable<any>}
   */
  getTitles(params: HttpParams): Observable<any> {
    return this.http.get('');
  }

  /**
   * 根据id删除对应title信息
   * @param {number} id
   * @returns {Observable<any>}
   */
  deleteTitleById(id: number): Observable<any> {
    return this.http.get('');
  }
  /**********************首页模块管理api******************************/

  /**********************文章管理api******************************/

  /**
   * 获取文章列表
   * @param params
   * @returns {Observable<any>}
   */
  getArticles(page: any, sort: any): Observable<any> {
    const baseUrl = 'https://api.github.com/search/issues?q=repo:angular/material2';
    let targeUrl = `${baseUrl}&page=${page.pageIndex + 1}&per_page=${page.pageSize}`;
    if (sort.direction) {
      targeUrl = `${targeUrl}&sort=${sort.active}&order=${sort.direction}`;
    }
    return this.http
      .get(targeUrl);
  }

  /**
   * 更新文章内容
   * @param data
   * @returns {Observable<any>}
   */
  addArticle(data: any): Observable<any> {
    return this.http.post('', data);
  }

  /**
   * 根据文章id获取对应文章信息
   * @param {string} id
   * @returns {Observable<any>}
   */
  getArticleById(id: string): Observable<any> {
    return this.http.get('', {
      params: {id: id}
    });
  }

  /**********************脚注管理api******************************/

}
