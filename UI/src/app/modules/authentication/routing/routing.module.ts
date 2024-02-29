import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "../registration/signup/signup.component";
import {APP_ROUTES} from "../../../shared/constanst";
import {LoginComponent} from "../login/login.component";

const routes: Routes = [
  {
    path: APP_ROUTES.signup,
    component: SignupComponent
  },
  {
    path: APP_ROUTES.login,
    component: LoginComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
