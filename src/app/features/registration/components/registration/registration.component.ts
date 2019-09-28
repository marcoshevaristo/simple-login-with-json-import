import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  formMasks,
  maskSelector,
  cpfPattern,
  mobilePhonePattern,
  phonePattern
} from "src/app/core/utils/form-utils";
import { AddressType, PhoneType } from "src/app/core/enums/form-enums";
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

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  public onSubmit() {
    let rawValues = this.registrationFormGroup.value;
    rawValues.phone = Object.entries(rawValues.phone).map(phoneProp => {
      return { number: phoneProp[1], type: phoneProp[0] };
    });

    this.registrationService.sendForm(rawValues);
  }

  private setupForm() {
    this.registrationFormGroup = new FormGroup({
      cpf: new FormControl("", [
        Validators.required,
        Validators.pattern(cpfPattern),
        Validators.minLength(14)
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
