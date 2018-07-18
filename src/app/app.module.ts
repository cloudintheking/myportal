import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { RichTextComponent } from './rich-text/rich-text.component';


@NgModule({
  declarations: [
    AppComponent,
    RichTextComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
