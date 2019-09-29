import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { FakeLoginService } from "./fake-login.service";

@Injectable()
export class RedirectIfNotAuthenticated implements CanActivate {
  constructor(
    private fakeLoginService: FakeLoginService,
    private router: Router
  ) {}

  canActivate() {
    if (this.fakeLoginService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}

@Injectable()
export class SkipLoginIfAlreadyAuthenticated implements CanActivate {
  constructor(
    private fakeLoginService: FakeLoginService,
    private router: Router
  ) {}

  canActivate() {
    if (this.fakeLoginService.isUserLoggedIn()) {
      this.router.navigate(["registration"]);
      return false;
    }
    return true;
  }
}
