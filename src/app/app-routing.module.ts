import { Injectable, NgModule } from "@angular/core";
import { CanActivate, RouterModule, Routes, Router } from "@angular/router";
import { AppComponent } from "./app.component";
import { FakeLoginService } from "./core/services/fake-login.service";

@Injectable()
export class CheckLoggedUserResolver implements CanActivate {
  constructor(
    private fakeLoginService: FakeLoginService,
    private router: Router
  ) {}

  canActivate() {
    if (this.router.url.includes("login")) {
      return true;
    }
    if (this.fakeLoginService.isUserLoggedIn()) {
      return true;
    }
    // this.router.navigate(["login"]);
    return;
  }
}

const appRoutes: Routes = [
  {
    path: "",
    // canActivate: [CheckLoggedUserResolver],
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [CheckLoggedUserResolver],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {}
