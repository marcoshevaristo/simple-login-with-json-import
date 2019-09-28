import { NgModule, Injectable } from "@angular/core";
import { RouterModule, Routes, Resolve } from "@angular/router";
import { AppComponent } from "./app.component";
import { of } from "rxjs";

@Injectable()
export class CheckLoggedUserResolver implements Resolve<boolean> {
  constructor() {}

  resolve() {
    return of(true);
  }
}

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    runGuardsAndResolvers: "always",
    resolve: {
      userAlreadyLoggedIn: CheckLoggedUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {}
