import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { RegistrationFormType } from "src/app/core/types/form-types";

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  public sendForm(formData: RegistrationFormType): Observable<any> {
    // return this.httpClient.post("Alguma API", formData);
    return of({ success: true });
  }
}
