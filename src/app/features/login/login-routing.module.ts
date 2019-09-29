import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SkipLoginIfAlreadyAuthenticated } from "src/app/core/services/auth-guard";
import { SharedModule } from "../../core/shared/shared.module";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [SkipLoginIfAlreadyAuthenticated]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [SkipLoginIfAlreadyAuthenticated]
})
export class LoginRoutingModule {}
