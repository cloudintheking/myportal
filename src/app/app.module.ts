import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { RichTextComponent } from './rich-text/rich-text.component';
import { FontEndModule } from './font-end/font-end.module';
import { BackEndModule } from './back-end/back-end.module';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    RichTextComponent
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
