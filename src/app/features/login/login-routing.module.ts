import { CommonModule } from "@angular/common";
import { Injectable, NgModule } from "@angular/core";
import { Resolve, RouterModule, Routes } from "@angular/router";
import { of } from "rxjs";
import { SharedModule } from "../../core/shared/shared.module";
import { LoginComponent } from "./components/login/login.component";

@Injectable()
export class CheckLoggedUserResolver implements Resolve<boolean> {
  constructor() {}

  resolve() {
    return of(true);
  }
}

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    resolve: {
      userAlreadyLoggedIn: CheckLoggedUserResolver
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [CheckLoggedUserResolver]
})
export class LoginRoutingModule {}
