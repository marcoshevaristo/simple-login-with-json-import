import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { RegistrationComponent } from "./components/registration/registration.component";
import { RegistrationRoutingModule } from "./registration-routing.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [SharedModule, RegistrationRoutingModule],
  exports: [RegistrationComponent]
})
export class RegistrationModule {}
