import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackEndComponent } from './back-end.component';
import { ManageComponent } from './manage/manage.component';
import { TitleManageComponent } from './title-manage/title-manage.component';
import { HomeManageComponent } from './home-manage/home-manage.component';
import { ArticleManageComponent } from './article-manage/article-manage.component';
import { FootManageComponent } from './foot-manage/foot-manage.component';
import { RichTextComponent } from './rich-text/rich-text.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {Routes, RouterModule} from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BackEndComponent, ManageComponent, TitleManageComponent, HomeManageComponent,
    ArticleManageComponent, FootManageComponent, RichTextComponent]
})
export class BackEndModule { }
