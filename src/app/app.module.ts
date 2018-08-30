import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
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
import {FrontEndModule} from './front-end/front-end.module';


const ROUTES: Routes = [
  {
    path: '', redirectTo: 'frontend', pathMatch: 'full'
  },
  {
    path: 'frontend',
    loadChildren: './front-end/front-end.module#FrontEndModule'
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
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    FrontEndModule,
    BackEndModule,
  ],
  entryComponents: [AddConfirmDialogComponent],
  providers: [BackApiService, BackGuard, HomeResolveService, OtherResolveService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
