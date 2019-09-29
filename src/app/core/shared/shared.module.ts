import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, ReactiveFormsModule],
  providers: [CookieService]
})
export class SharedModule {}
