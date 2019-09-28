import { Injectable } from "@angular/core";
import { RegistrationFormType } from "./registration.component";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  public sendForm(formData: RegistrationFormType) {
    this.httpClient.post("Alguma API", formData);
  }
}
