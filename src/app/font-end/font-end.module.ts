import {Zone1Component} from './home/zone1/zone1.component';
import {Zone3Component} from './home/zone3/zone3.component';
import {Zone2Component} from './home/zone2/zone2.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontEndComponent} from './font-end.component';
import {LogoComponent} from './logo/logo.component';
import {TitleComponent} from './title/title.component';
import {FootComponent} from './foot/foot.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FroalaViewModule} from 'angular-froala-wysiwyg';
import {RichTextComponent} from './rich-text/rich-text.component';

const ROUTES: Routes = [
  {
    path: '', component: FontEndComponent,
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'other', loadChildren: './other/other.module#OtherModule'
      },
      {
        path: 'us/:id', component: RichTextComponent
      }
    ]
  }
  // {
  //   path: '', redirectTo: 'home', pathMatch: 'full'
  // },
  // {
  //   path: 'home', component: HomeComponent
  // },
  // {
  //   path: 'other', loadChildren: './other/other.module#OtherModule'
  // }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FroalaViewModule.forRoot(),
    FlexLayoutModule,
    SharedMaterialModule
  ],
  declarations: [FontEndComponent, LogoComponent, TitleComponent, HomeComponent,
    FootComponent, Zone1Component, Zone2Component, Zone3Component, RichTextComponent]
})
export class FontEndModule {
}
