import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { first } from "rxjs/operators";
import { AddressType, PhoneType } from "src/app/core/enums/form-enums";
import {
  cpfPattern,
  formMasks,
  maskSelector,
  mobilePhonePattern,
  phonePattern
} from "src/app/core/utils/form-utils";
import { RegistrationService } from "./registration.service";

export interface RegistrationFormType {
  cpf: string;
  name?: string;
  description?: string;
  address: {
    street: string;
    type?: AddressType;
  };
  phone?: [
    { number: string; type: PhoneType },
    { number: string; type: PhoneType },
    { number: string; type: PhoneType }
  ];
}

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  public registrationFormGroup: FormGroup;
  public addressTypes = Object.values(AddressType);
  public showSuccess = false;
  public showFailure = false;
  public showClearInfo = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  public onSubmit() {
    this.showSuccess = false;
    this.showFailure = false;
    this.showClearInfo = false;
    let rawValues = this.registrationFormGroup.value;
    rawValues.phone = Object.entries(rawValues.phone)
      .filter(phoneProp => phoneProp[1])
      .map(phoneProp => {
        return { number: phoneProp[1], type: phoneProp[0] };
      });

    this.registrationService
      .sendForm(rawValues)
      .pipe(first())
      .subscribe((output: any) => {
        if (output.success) {
          this.showSuccess = true;
        } else {
          this.showFailure = true;
        }
      });
  }

  public clearFormCallback() {
    this.showClearInfo = true;
  }

  private setupForm() {
    this.registrationFormGroup = new FormGroup({
      cpf: new FormControl("", [
        Validators.required,
        Validators.pattern(cpfPattern)
      ]),
      name: new FormControl("", Validators.maxLength(255)),
      description: new FormControl("", Validators.maxLength(255)),
      address: this.formBuilder.group({
        street: new FormControl("", [
          Validators.required,
          Validators.maxLength(255)
        ]),
        type: new FormControl(this.addressTypes[0], Validators.maxLength(255))
      }),
      phone: this.formBuilder.group({
        mobile: new FormControl("", Validators.pattern(mobilePhonePattern)),
        home: new FormControl("", Validators.pattern(phonePattern)),
        work: new FormControl("", Validators.pattern(phonePattern))
      })
    });

    this.setupInputMasks();
  }

  private setupInputMasks() {
    maskSelector(formMasks.cpf, $("#cpf"));
    maskSelector(formMasks.mobilePhone, $("#mobile"));
    maskSelector(formMasks.phone, $("#home"));
    maskSelector(formMasks.phone, $("#work"));
  }
}
