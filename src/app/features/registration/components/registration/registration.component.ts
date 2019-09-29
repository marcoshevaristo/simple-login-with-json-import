import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/base.component";
import {
  AddressType,
  RegistrationFormType
} from "src/app/core/types/form-types";
import {
  cpfPattern,
  formMasks,
  maskSelector,
  mobilePhonePattern,
  phonePattern
} from "src/app/core/utils/form-utils";
import { RegistrationService } from "./registration.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent extends BaseComponent implements OnInit {
  @ViewChild("inputFile", { static: false }) inputFileElem: ElementRef;
  public registrationFormGroup: FormGroup;
  public addressTypes = Object.values(AddressType);
  public showSuccess = false;
  public showFailure = false;
  public showClearInfo = false;
  public showInvalidFileFormat = false;

  private fileReader: FileReader;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    super();
  }

  ngOnInit() {
    this.setupForm();
    this.setupFileReader();
  }

  public onSubmit() {
    this.clearAllAlerts();
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
    this.clearAllAlerts();
    this.showClearInfo = true;
  }

  public loadJsonToForm(event) {
    this.clearAllAlerts();
    this.fileReader.readAsText(event.target.files[0], "UTF-8");
  }

  private clearAllAlerts() {
    this.showClearInfo = false;
    this.showFailure = false;
    this.showInvalidFileFormat = false;
    this.showSuccess = false;
  }

  private setupFileReader() {
    this.fileReader = new FileReader();
    this.fileReader.onload = () => {
      try {
        this.replicateJsonDataToForm(JSON.parse("" + this.fileReader.result));
      } catch (error) {
        this.setFileUploadError();
      }
    };

    this.fileReader.onerror = () => this.setFileUploadError();
  }

  private setFileUploadError() {
    this.showInvalidFileFormat = true;
    this.inputFileElem.nativeElement.value = "";
  }

  private replicateJsonDataToForm(jsonObject: RegistrationFormType) {
    Object.keys(jsonObject).forEach(key => {
      if (key === "phone") {
        const phoneValues = jsonObject[key];
        phoneValues.forEach(phoneValue => {
          this.registrationFormGroup
            .get(key)
            .get(phoneValue.type)
            .setValue(phoneValue.number);
        });
      } else {
        this.registrationFormGroup.get(key).setValue(jsonObject[key]);
      }
    });
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
