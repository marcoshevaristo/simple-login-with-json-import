import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../core/shared/shared.module";
import { LoginModule } from "./login/login.module";
import { RegistrationModule } from "./registration/registration.module";

@NgModule({
  imports: [CommonModule, SharedModule, LoginModule, RegistrationModule],
  exports: [LoginModule]
})
export class FeaturesModule {}
