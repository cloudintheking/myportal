import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackEndComponent} from './back-end.component';
import {BackMenuComponent} from './back-menu/back-menu.component';
import {CategoryManageComponent} from './category-manage/category-manage.component';
import {ZoneManageComponent} from './zone-manage/zone-manage.component';
import {ArticleManageComponent} from './article-manage/article-manage.component';
import {OtherManageComponent} from './other-manage/other-manage.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeadManageComponent} from './head-manage/head-manage.component';
import {AddArticleDialogComponent} from './article-manage/add-article-dialog/add-article-dialog.component';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import {AddConfirmDialogComponent} from '../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {AddTitleDialogComponent} from './category-manage/add-category-dialog/add-title-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddZoneDialogComponent} from './zone-manage/add-zone-dialog/add-zone-dialog.component';
import {AddLinkDialogComponent} from './other-manage/add-link-dialog/add-link-dialog.component';
import {DeleteTitleDialogComponent} from './category-manage/delete-category-dialog/delete-title-dialog.component';
import {DeleteLinkDialogComponent} from './other-manage/delete-link-dialog/delete-link-dialog.component';

const ROUTES: Routes = [
  {
    path: '', component: BackEndComponent,
    children: [
      {
        path: 'head', component: HeadManageComponent
      },
      {
        path: 'home', component: ZoneManageComponent
      },
      {
        path: 'title', component: CategoryManageComponent
      },
      {
        path: 'article', component: ArticleManageComponent
      },
      {
        path: 'footer', component: OtherManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forChild(ROUTES),
    SharedMaterialModule
  ],
  exports: [AddConfirmDialogComponent],
  entryComponents: [AddArticleDialogComponent, AddConfirmDialogComponent,
    AddTitleDialogComponent, AddZoneDialogComponent, AddLinkDialogComponent,
    DeleteTitleDialogComponent, DeleteLinkDialogComponent],
  declarations: [
    BackEndComponent, BackMenuComponent, CategoryManageComponent, ZoneManageComponent, AddConfirmDialogComponent,
    ArticleManageComponent, OtherManageComponent, HeadManageComponent, AddArticleDialogComponent,
    AddTitleDialogComponent, AddZoneDialogComponent, AddLinkDialogComponent, DeleteTitleDialogComponent, DeleteLinkDialogComponent]
})
export class BackEndModule {
}
