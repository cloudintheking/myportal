import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Zone1Component } from './zone1/zone1.component';
import { Zone2Component } from './zone2/zone2.component';
import { Zone3Component } from './zone3/zone3.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [HomeComponent, Zone1Component, Zone2Component, Zone3Component]
})
export class HomeModule { }
