import {Zone1Component} from './home/zone1/zone1.component';
import {Zone3Component} from './home/zone3/zone3.component';
import {Zone2Component} from './home/zone2/zone2.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontEndComponent} from './font-end.component';
import {LogoComponent} from './logo/logo.component';
import {TitleComponent} from './title/title.component';
import {LoginComponent} from './login/login.component';
import {FootComponent} from './foot/foot.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaginatorComponent} from '../common-components/paginator/paginator.component';

const ROUTES: Routes = [
  {
    path: '', component: FontEndComponent,
    children: [
      {
        path: '', redirectTo: 'home'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'other', loadChildren: './other/other.module#OtherModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FroalaViewModule.forRoot(),
    FlexLayoutModule,
    SharedMaterialModule
  ],
  exports: [
    FontEndComponent
  ],
  declarations: [FontEndComponent, LogoComponent, TitleComponent, HomeComponent,
    LoginComponent, FootComponent, Zone1Component, Zone2Component, Zone3Component]
})
export class FontEndModule {
}
