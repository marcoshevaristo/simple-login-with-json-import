import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      loginform: this.formBuilder.group({
        username: new FormControl(""),
        password: new FormControl("")
      })
    });
  }
}
