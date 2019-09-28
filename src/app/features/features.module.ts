import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/shared.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginModule
  ],
  declarations: [],
  exports: [
    LoginModule
  ]
})
export class FeaturesModule { }
