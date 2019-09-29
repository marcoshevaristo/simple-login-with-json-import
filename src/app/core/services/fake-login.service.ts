import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SSL_OP_COOKIE_EXCHANGE } from "constants";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

export interface User {
  username: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: "root" })
export class FakeLoginService {
  private validUsers = [
    {
      username: "admin",
      password: "admin"
    },
    {
      username: "marcos",
      password: "123"
    },
    {
      username: "teste",
      password: "123456"
    }
  ];

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {}

  public fakeLogin(username: string, password: string) {
    // return this.httpClient.post(`Alguma API`, { username, password }).pipe(
    //   map((user: any) => {
    //     localStorage.setItem("loggedUser", JSON.stringify(user));
    //     this.currentUser.next(user);
    //     return user;
    //   })
    // );

    let newUser: User = { username, password };
    if (this.isUserValid(newUser)) {
      this.cookie.set("loggedUser", JSON.stringify(newUser), 1);
      this.router.navigate(["registration"]);
      return;
    }

    this.router.navigate(["login"], { queryParams: { loginFailure: true } });
  }

  public fakeLogout() {
    this.cookie.delete("loggedUser");
  }

  public isUserLoggedIn(): boolean {
    return !!this.cookie.get("loggedUser");
  }

  private isUserValid(newUser: User) {
    return (
      this.validUsers.findIndex(
        user =>
          user.username === newUser.username &&
          user.password === newUser.password
      ) >= 0
    );
  }
}
