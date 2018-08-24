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
import {BackGuard} from './guard/back.guard';
import {HomeResolveService} from './guard/home-resolve.service';
import {OtherResolveService} from './guard/other-resolve.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AddConfirmDialogComponent} from './common-components/add-confirm-dialog/add-confirm-dialog.component';
import {BackEndModule} from './back-end/back-end.module';
import {FontEndModule} from './font-end/font-end.module';
import {FontEndComponent} from './font-end/font-end.component';


const ROUTES: Routes = [
  {
    path: '', redirectTo: 'frontend', pathMatch: 'full'
  },
  {
    path: 'frontend',
    loadChildren: './font-end/font-end.module#FontEndModule'
  },
  {
    path: 'backend', loadChildren: './back-end/back-end.module#BackEndModule', canActivate: [BackGuard]
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
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    FontEndModule,
    BackEndModule,
  ],
  entryComponents: [AddConfirmDialogComponent],
  providers: [HomeApiService, BackApiService, BackGuard, HomeResolveService, OtherResolveService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
