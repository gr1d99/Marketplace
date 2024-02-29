import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {CardComponent} from "../../../components/card/card.component";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {ButtonComponent} from "../../../components/button/button.component";

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    CardComponent,
    NzSpaceModule,
    ButtonComponent,
    NzFormModule,
  ]
})
export class RegistrationModule { }
