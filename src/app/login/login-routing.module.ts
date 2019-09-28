import { CommonModule } from '@angular/common';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { SharedModule } from '../core/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { of } from 'rxjs';

@Injectable()
export class CheckLoggedUserResolver implements Resolve<boolean> {

  constructor() {

  }

  resolve() {
    return of(true);
  }
}


const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  resolve: {
    userAlreadyLoggedIn: CheckLoggedUserResolver
  }
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
