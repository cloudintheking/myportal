import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
import { MenuComponent } from './menu/menu.component';
import { ArticleList1Component } from './article-list1/article-list1.component';
import { ArticleList2Component } from './article-list2/article-list2.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [OtherComponent, MenuComponent, ArticleList1Component, ArticleList2Component, ArticleDetailComponent]
})
export class OtherModule { }
