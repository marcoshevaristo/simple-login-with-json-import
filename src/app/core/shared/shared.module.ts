import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, ReactiveFormsModule]
})
export class SharedModule {}
