import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../core/shared/shared.module";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class LoginRoutingModule {}
