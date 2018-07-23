import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { FontEndModule } from './font-end/font-end.module';
import { BackEndModule } from './back-end/back-end.module';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '', redirectTo: 'fontEnd'
  },
  {
    path: 'fontEnd', loadChildren: './font-end/font-end.module#FontEndModule'
  },
  {
    path: 'backEnd', loadChildren: './back-end/back-end.module#BackEndModule'
  }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FontEndModule,
    BackEndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
