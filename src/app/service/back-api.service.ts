import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'environments/environment';

/**
 * @author hl
 * @date 2018/8/2
 * @Description: 后台管理API
 */
@Injectable()
export class BackApiService {
  baseUrl = environment.baseUrl;
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
   * 根据查询参数获取栏目信息
   * @returns {Observable<any>}
   */
  getAllTitles(params: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/cms/article/type/getBy', params);
  }

  /**
   * 根据id查询栏目
   * @param {string} id
   * @returns {Observable<Object>}
   */
  getTitleById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/cms/article/type/getById', {
      params: {
        typeID: id
      }
    });
  }

  /**
   * 根据分类等级获取栏目
   * @param {string} level
   */
  getTitlesByLevel(level: string): Observable<any> {
    const header: HttpHeaders = new HttpHeaders();
    header.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.baseUrl + '/japi/cms/article/type/getByLevel', {
      params: {
        level: level
      }
    });
  }

  /**
   * 获取栏目树形结构
   * @param params
   * @returns {Observable<any>}
   */
  getTitlesTree(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/cms/article/type/getTree', {
      params: params
    });
  }

  /**
   * 新增栏目
   * @param {HttpParams} params
   * @returns {Observable<any>} 返回成功消息、栏目id等
   */
  addTitle(params: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/cms/article/type/newType', params);
  }

  /**
   * 更新栏目信息
   * @param {HttpParams} params
   * @returns {Observable<any>}
   */
  updateTitle(params: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/cms/article/type/update', params);
  }

  /**
   * 删除对应栏目信息
   * @param {any} params{typeID(栏目ID),toID(文章移动栏目ID)}
   * @returns {Observable<any>}
   */
  deleteTitle(params: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/cms/article/type/deleteAndMoveTo', params);
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
