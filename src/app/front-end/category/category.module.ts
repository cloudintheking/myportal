import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ArticleList1Component} from './article-list1/article-list1.component';
import {ArticleList2Component} from './article-list2/article-list2.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {Routes, RouterModule} from '@angular/router';
import {PaginatorComponent} from '../../common-components/paginator/paginator.component';
import {FroalaViewModule} from 'angular-froala-wysiwyg';

const ROUTES: Routes = [
  {
    path: '', component: CategoryComponent, children: [
      {
        path: 'style1', component: ArticleList1Component
      },
      {
        path: 'style2', component: ArticleList2Component
      },
      {
        path: 'detail', component: ArticleDetailComponent
      }
    ],
    resolve: {}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FroalaViewModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule],
  declarations: [CategoryComponent, SideMenuComponent, ArticleList1Component, ArticleList2Component,
    ArticleDetailComponent, PaginatorComponent]
})
export class CategoryModule {
}
