import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationComponent } from "./components/registration/registration.component";
import { RouterModule, Routes } from "@angular/router";
import { RedirectIfNotAuthenticated } from "src/app/core/services/auth-guard";

const routes: Routes = [
  {
    path: "",
    component: RegistrationComponent,
    canActivate: [RedirectIfNotAuthenticated]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [RedirectIfNotAuthenticated]
})
export class RegistrationRoutingModule {}
