import { Injectable } from "@angular/core";
import { RegistrationFormType } from "./registration.component";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  public sendForm(formData: RegistrationFormType): Observable<any> {
    // return this.httpClient.post("Alguma API", formData);
    return of({ success: true });
  }
}
