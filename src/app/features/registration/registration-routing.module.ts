import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationComponent } from "./components/registration/registration.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "registration",
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RegistrationRoutingModule {}
