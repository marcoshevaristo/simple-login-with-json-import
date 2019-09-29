import { Component } from "@angular/core";
import { BaseComponent } from "./base.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent extends BaseComponent {
  title = "testeFrontend";
}
