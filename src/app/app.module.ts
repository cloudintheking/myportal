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
import {BackApiService} from './service/back-api.service';
import {LoginService} from './service/login.service';
import {BackGuard} from './guard/back.guard';
import {HomeResolveService} from './guard/home-resolve.service';
import {OtherResolveService} from './guard/other-resolve.service';


const ROUTES: Routes = [
  {
    path: '', redirectTo: 'fontend', pathMatch: 'full'
  },
  {
    path: 'fontend',
    loadChildren: './font-end/font-end.module#FontEndModule'
  },
  {
    path: 'backend', loadChildren: './back-end/back-end.module#BackEndModule',
    canActivate: [BackGuard]
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
  providers: [HomeApiService, BackApiService, LoginService, BackGuard, HomeResolveService, OtherResolveService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
