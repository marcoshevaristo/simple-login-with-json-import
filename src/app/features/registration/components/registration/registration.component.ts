import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { VirtualTimeScheduler } from "rxjs";
import { formMasks } from "src/app/core/utils/form-utils";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  public registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registrationFormGroup = new FormGroup({
      personalDataFormGroup: this.formBuilder.group({
        cpf: new FormControl(formMasks.cpf),
        name: new FormControl()
      }),
      addressFormGroup: this.formBuilder.group({
        street: new FormControl(),
        type: new FormControl()
      }),
      contactFormGroup: this.formBuilder.group({
        phone: this.formBuilder.array([
          { mobile: new FormControl(formMasks.mobilePhone) },
          { home: new FormControl(formMasks.phone) },
          { work: new FormControl(formMasks.phone) }
        ])
      })
    });
  }
}
