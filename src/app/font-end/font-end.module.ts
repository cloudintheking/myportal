import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontEndComponent } from './font-end.component';
import { LogoComponent } from './logo/logo.component';
import { TitleComponent } from './title/title.component';
import { OtherModule } from './other/other.module';
import { LoginComponent } from './login/login.component';
import { FootComponent } from './foot/foot.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const ROUTES: Routes = [
  {
    path : '', redirectTo: 'home'
  },
  {
    path: 'home', component: HomeComponent, resolve: {}
  },
  {
    path: 'other/:fid', loadChildren: './other/other.module#OtherModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    OtherModule
  ],
  declarations: [FontEndComponent, LogoComponent, TitleComponent, HomeComponent, LoginComponent, FootComponent]
})
export class FontEndModule { }
