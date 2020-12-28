import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {FooterComponent} from './footer/footer.component';
import {MaterialDesignModule} from './material-design/material-design.module';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    NoImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialDesignModule,
    ShowHidePasswordModule
  ],
  exports: [
    FooterComponent,
    MaterialDesignModule,
    NoImagePipe,
  ]
})
export class SharedModule {
}
