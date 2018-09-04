import {Injectable} from '@angular/core';
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
  baseUrl = environment.baseUrl; // CMS系统接口域名
  fileUrl = environment.fileUrl; // 文件系统接口域名
  ssoUrl = environment.ssoUrl; // 单点登录接口域名
  froalaOptions: object; // 富文本配置
  userData: Storage = localStorage; // 登录信息保存至本地storage
  constructor(private  http: HttpClient) {
    this.froalaOptions = {
      placeholder: 'Edit Me',
      imageMaxSize: 1024 * 1024 * 3, // 图片限制3M
      // imageUploadMethod: 'POST',
      imageUploadURL: this.fileUrl + '/japi/filesystem/richUpload',
      imageUploadParam: 'files',
      fileMaxSize: 1024 * 1024 * 20, // 文件限制20M
      fileUploadParam: 'files',
      fileUploadURL: this.fileUrl + '/japi/filesystem/richUpload',
      videoMaxSize: 1024 * 1024 * 400, // 视频限制400M
      videoUploadParam: 'files',
      videoUploadURL: this.fileUrl + '/japi/filesystem/richUpload',
      // videoUploadParams: { // 上传参数
      //   viewByAnon: true,
      //   longLife: true,
      //   maxFileSize: 419430400
      // },
      events: {
        // 'froalaEditor.image.beforeUpload': (e, editor, images) => {
        //   console.log('before upload editor', images);
        //   const data: FormData = new FormData();
        //   data.append('file', images[0]);
        //   data.append('viewByAnon', 'true');
        //   data.append('longLife', 'true');
        //   data.append('maxFileSize', images[0].size);
        //   $.ajax({
        //     url: this.fileUrl + '/japi/filesystem/upload',
        //     method: 'POST',
        //     data: data,
        //     processData: false,
        //     contentType: false
        //   })
        //     .done(res => {
        //       console.log(res);
        //     })
        //     .fail(res => {
        //       console.log(res);
        //     });
        // },
        'froalaEditor.image.uploaded': (e, editor, response) => {
          console.log('response', response);
        },
        'froalaEditor.image.removed': (e, editor, $img) => {
          console.log('remove', $img[0]);
          const src = $img.attr('src');
          console.log('src', src);
          const index = src.indexOf('?id='); // 获取文件id
          console.log('id', src.slice(index + 4));
          const deleteUrl = this.fileUrl + '/japi/filesystem/deleteBatch' + '?id=' + src.slice(index + 4);  // 拼接url
          $.ajax({
            method: 'GET',
            url: deleteUrl
          })
            .done((data11) => {
              console.log('image was deleted');
            })
            .fail((err) => {
              console.log('image deleteArticle problem: ' + JSON.stringify(err));
            });
        },
        // 'froalaEditor.file.beforeUpload': (e, editor, files) => {
        // },
        'froalaEditor.file.unlink': (e, editor, link) => {
          const src = link.getAttribute('href');
          const index = src.indexOf('?id='); // 获取文件id
          const deleteUrl = this.fileUrl + '/japi/filesystem/deleteBatch' + '?id=' + src.slice(index + 4);  // 拼接url
          $.ajax({
            method: 'GET',
            url: deleteUrl
          })
            .done(function (data1) {
              console.log('file was deleted');
            })
            .fail(function (err) {
              console.log('file deleteArticle problem: ' + JSON.stringify(err.message));
            });
        },
        'froalaEditor.video.removed': (e, editor, video) => {
          const src = video.getAttribute('src');
          const index = src.indexOf('?id='); // 获取文件id
          const deleteUrl = this.fileUrl + '/japi/filesystem/deleteBatch' + '?id=' + src.slice(index + 4);  // 拼接url
          $.ajax({
            method: 'GET',
            url: deleteUrl
          })
            .done(function (data2) {
              console.log('file was deleted');
            })
            .fail(function (err) {
              console.log('file deleteArticle problem: ' + JSON.stringify(err));
            });
        }
      }
    };
  }

  /*****************************登录接口************************************/
  /**
   * 登录
   * @param data
   * @returns {Observable<any>}
   */
  loginIn(data: any): Observable<any> {
    return this.http.post(this.ssoUrl + '/japi/login', data);
  }

  /**
   * 登出
   * @param data
   * @returns {Observable<any>}
   */
  loginOut(data: any): Observable<any> {
    return this.http.get(this.ssoUrl + '/japi/logout', data);
  }

  /*************************文件上传接口*************************************/
  /**
   *  文件上传
   * @param {FormData} file 文件数据
   * @param {any} params 上传参数
   * @returns {Observable<any[]>} 返回文件路径数组流
   */
  uploadFile(file: FormData, params: any): Observable<any> {
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', undefined);
    return this.http.post(this.fileUrl + '/japi/filesystem/upload', file, {
      headers: header,
      params: params
    });
  }

  /**********************其他配置管理api******************************/
  /**
   * 获取配置
   * @returns {Observable<any>}
   */
  getOption(): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/option/get');
  }

  /**
   * 更新配置
   * @param data
   * @returns {Observable<any>}
   */
  updateOption(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/option/update', data);
  }

  /**
   * 匿名
   * 获取配置
   * @returns {Observable<any>}
   */
  getOptionAnon(): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/option/get');
  }

  /**********************栏目管理api******************************/
  /**
   * 根据id+查询栏目
   * @param {any} params
   * @returns {Observable<Object>}
   */
  getCategoryById(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/category/findById', {
      params: params
    });
  }

  /**
   * 获取分页栏目信息
   * @returns {Observable<any>}
   */
  getCategoryPage(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/category/findByPage', data);
  }

  /**
   * 普通条件查询栏目
   * @param {any} data
   */
  getCategories(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/category/findAll', data);
  }

  /**
   * 获取栏目树形结构
   * @param params
   * @returns {Observable<any>}
   */
  getCategoriesTree(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/category/findByTree', {
      params: params
    });
  }

  /**
   * 新增栏目
   * @param {any} data
   * @returns {Observable<any>} 返回成功消息、栏目id等
   */
  addCategory(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/category/save', data);
  }

  /**
   * 更新栏目信息
   * @param {any} data
   * @returns {Observable<any>}
   */
  updateCategory(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/category/update', data);
  }

  /**
   * 删除栏目信息
   * 关联首页展区及文章删除
   * 下级栏目升级
   * @param {any} params
   * @returns {Observable<any>}
   */
  deleteCategory(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/category/delete', {
      params: params
    });
  }

  /**
   * 匿名接口
   * 普通条件查询栏目
   * @param {any} data
   */
  getCategoriesAnon(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/category/findAll', data);
  }

  /**********************首页模块管理api******************************/
  /**
   *条件查询首页展区信息
   * @param data
   * @returns {Observable<any>}
   */
  getZones(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/zone/findAll', data);
  }

  /**
   *分页查询首页展区信息
   * @param data
   * @returns {Observable<any>}
   */
  getZonesPage(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/zone/findByPage', data);
  }


  /**
   * 根据id查询首页展区信息
   * @param {string} id
   * @returns {Observable<any>}
   */
  getZoneByID(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/zone/findById', {
      params: {
        id: id
      }
    });
  }

  /**
   * 新增首页展区
   * @param data
   * @returns {Observable<any>}
   */
  addZone(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/zone/save', data);
  }

  /**
   * 更新首页展区
   * @param data
   * @returns {Observable<any>}
   */
  updateZone(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/zone/update', data);
  }

  /**
   * 根据id删除首页展区
   * @param {string} id
   * @returns {Observable<any>}
   */
  deleteZone(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/zone/delete', {
      params: {id: id}
    });
  }

  /**
   * 匿名
   * 条件查询首页展区信息
   * @param data
   * @returns {Observable<any>}
   */
  getZonesAnon(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/zone/findAll', data);
  }

  /**********************文章管理api******************************/

  /**
   * 分页查询文章
   * @param data
   * @returns {Observable<any>}
   */
  getArticlesPage(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/article/findByPage', data);
  }

  /**
   * 根据文章id获取对应文章信息
   * @param {string} id
   * @returns {Observable<any>}
   */
  getArticleById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/article/findById', {
      params: {id: id}
    });
  }

  /**
   * 新增文章内容
   * @param data
   * @returns {Observable<any>}
   */
  addArticle(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/article/save', data);
  }

  /**
   * 更新文章内容
   * @param data
   * @returns {Observable<any>}
   */
  updateArticle(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/article/update', data);
  }

  /**
   * 根据id删除文章
   * @param {string} id
   * @returns {Observable<any>}
   */
  deleteArticleByID(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/article/delete', {
      params: {
        id: id
      }
    });
  }

  /**
   * 匿名
   * 根据文章id获取对应文章信息
   * @param {any} params
   * @returns {Observable<any>}
   */
  getArticleByIdAnon(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/article/findById', {
      params: params
    });
  }

  /**
   * 匿名
   *获取关联文章信息
   * @param parans
   * @returns {Observable<any>}
   */
  getArticlesRelatedAnon(params: any): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/article/findRelatedArticles', {
      params: params
    });
  }

  /**
   * 匿名接口
   * 分页获取文章信息
   * @param data
   * @returns {Observable<any>}
   */
  getArticlesPageAnon(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/article/findByPage', data);
  }


  /**********************脚注管理api******************************/
  /**
   * 查询链接组
   * @returns {Observable<any>}
   */
  getLinkGroup(): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/linkgroup/findAll', {});
  }


  /**
   * 新增链接组标签
   * @param data
   * @returns {Observable<any>}
   */
  addLinkGroup(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/linkgroup/save', data);
  }

  /**
   * 根据id删除链接组
   * @param {string} id
   * @returns {Observable<any>}
   */
  deleteLinkGroup(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/linkgroup/delete', {
      params: {
        id: id
      }
    });
  }

  /**
   * 匿名
   * 查询链接组
   * @returns {Observable<any>}
   */
  getLinkGroupAnon(): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/linkgroup/findAllwithLinks',{});
  }

  /**
   * 分页查询链接信息
   * @param data
   * @returns {Observable<any>}
   */
  getLinksPage(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/link/findByPage', data);
  }

  /**
   * 根据id查询链接信息
   * @param {string} id
   * @returns {Observable<any>}
   */
  getLinkByID(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/link/findById', {
      params: {
        id: id
      }
    });
  }

  /**
   * 新增链接
   * @param data
   * @returns {Observable<any>}
   */
  addLink(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/link/save', data);
  }

  /**
   * 更新链接
   * @param data
   * @returns {Observable<any>}
   */
  updateLink(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/japi/backsystem/link/update', data);
  }

  /**
   * 根据id删除链接
   * @param {string} id
   * @returns {Observable<any>}
   */
  deleteLinkByID(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/japi/backsystem/link/delete', {
      params: {
        id: id
      }
    });
  }

}
