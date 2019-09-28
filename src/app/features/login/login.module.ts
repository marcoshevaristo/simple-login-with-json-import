import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../core/shared/shared.module";
import { LoginComponent } from "./components/login/login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
