import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackEndComponent} from './back-end.component';
import {ManageComponent} from './manage/manage.component';
import {TitleManageComponent} from './title-manage/title-manage.component';
import {HomeManageComponent} from './home-manage/home-manage.component';
import {ArticleManageComponent} from './article-manage/article-manage.component';
import {FootManageComponent} from './foot-manage/foot-manage.component';
import {RichTextComponent} from './rich-text/rich-text.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoManageComponent } from './logo-manage/logo-manage.component';
import { AddArticleDialogComponent } from './article-manage/add-article-dialog/add-article-dialog.component';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import {AddConfirmDialogComponent} from '../common-components/add-confirm-dialog/add-confirm-dialog.component';
import { LogoMangeComponent } from './logo-mange/logo-mange.component';

const ROUTES: Routes = [
  {
    path: '', component: BackEndComponent, resolve: {},
    children: [
      {
        path: 'logo', component: LogoManageComponent
      },
      {
        path: 'home', component: HomeManageComponent
      },
      {
        path: 'title', component: TitleManageComponent
      },
      {
        path: 'article', component: ArticleManageComponent
      },
      {
        path: 'footer', component: FootManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forChild(ROUTES),
    SharedMaterialModule
  ],
  entryComponents: [AddArticleDialogComponent, AddConfirmDialogComponent],
  declarations: [
    BackEndComponent, ManageComponent, TitleManageComponent, HomeManageComponent, AddConfirmDialogComponent,
    ArticleManageComponent, FootManageComponent, RichTextComponent, LogoManageComponent, AddArticleDialogComponent, LogoMangeComponent]
})
export class BackEndModule {
}
