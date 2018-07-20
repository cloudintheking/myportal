import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontEndComponent } from './font-end.component';
import { LogoComponent } from './logo/logo.component';
import { TitleComponent } from './title/title.component';
import { HomeModule } from './home/home.module';
import { OtherModule } from './other/other.module';
import { LoginComponent } from './login/login.component';
import { FootComponent } from './foot/foot.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HomeModule,
    OtherModule
  ],
  declarations: [FontEndComponent, LogoComponent, TitleComponent, LoginComponent, FootComponent]
})
export class FontEndModule { }
