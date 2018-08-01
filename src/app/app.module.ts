import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeApiService} from './service/home-api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {SharedMaterialModule} from './shared-material/shared-material.module';
import {OtherResolveService} from './service/other-resolve.service';
import {BackApiService} from './service/back-api.service';
const ROUTES: Routes = [
  {
    path: '', redirectTo: 'fontend', pathMatch: 'full'
  },
  {
    path: 'fontend',
    loadChildren: './font-end/font-end.module#FontEndModule'
  },
  {
    path: 'backend', loadChildren: './back-end/back-end.module#BackEndModule'
  },
  {
    path: 'login', component: LoginComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule
  ],
  providers: [HomeApiService, BackApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
