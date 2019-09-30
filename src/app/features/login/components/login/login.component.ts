import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/base.component";
import { FakeLoginService } from "src/app/core/services/fake-login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent extends BaseComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public showLoginFailure = false;

  constructor(
    private fakeLoginService: FakeLoginService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params["loginFailure"]) {
        this.showLoginFailure = true;
      }
    });
  }

  public onSubmit() {
    this.showLoginFailure = false;
    this.isLoading = true;
    const formValues = this.loginFormGroup.value;
    this.fakeLoginService.fakeLogin(formValues.username, formValues.password);

    // Se passou pelo fakeLogin e não fez navegação, ocorreu um erro na autenticação.
    this.showLoginFailure = true;
    this.isLoading = false;
  }
}
