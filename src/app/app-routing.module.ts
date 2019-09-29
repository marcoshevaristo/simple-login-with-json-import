import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: "src/app/features/login/login.module#LoginModule"
  },
  {
    path: "registration",
    loadChildren:
      "src/app/features/registration/registration.module#RegistrationModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {}
