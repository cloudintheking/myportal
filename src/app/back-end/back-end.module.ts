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
import {LogoManageComponent} from './logo-manage/logo-manage.component';
import {AddArticleDialogComponent} from './article-manage/add-article-dialog/add-article-dialog.component';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import {AddConfirmDialogComponent} from '../common-components/add-confirm-dialog/add-confirm-dialog.component';
import {AddTitleDialogComponent} from './title-manage/add-title-dialog/add-title-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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
    FontAwesomeModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forChild(ROUTES),
    SharedMaterialModule
  ],
  entryComponents: [AddArticleDialogComponent, AddConfirmDialogComponent, AddTitleDialogComponent],
  declarations: [
    BackEndComponent, ManageComponent, TitleManageComponent, HomeManageComponent, AddConfirmDialogComponent,
    ArticleManageComponent, FootManageComponent, RichTextComponent, LogoManageComponent, AddArticleDialogComponent, AddTitleDialogComponent]
})
export class BackEndModule {
}
