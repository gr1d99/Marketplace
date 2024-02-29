import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {CardComponent} from "../../../components/card/card.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
