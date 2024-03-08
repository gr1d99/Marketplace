import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "../registration/signup/signup.component";
import {APP_ROUTES} from "../../../shared/constanst";
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";
import {Helpers} from "../../../helpers";

const routes: Routes = [
  {
    path: APP_ROUTES.auth,
    children: [
      {
        path: Helpers.generateRouteFromSegments([APP_ROUTES.login]),
        component: LoginComponent,
      },
      {
        path: Helpers.generateRouteFromSegments([APP_ROUTES.logout]),
        component: LogoutComponent,
      },
      {
        path: Helpers.generateRouteFromSegments([APP_ROUTES.signup]),
        component: SignupComponent,
      }
    ]
  }
  // {
  //   path: APP_ROUTES.login,
  //   component: LoginComponent,
  //   pathMatch: "full"
  // },
  // {
  //   path: APP_ROUTES.logout,
  //   component: LogoutComponent,
  //   pathMatch: "full"
  // },
  // {
  //   path: APP_ROUTES.signup,
  //   component: SignupComponent,
  //   pathMatch: "full"
  // },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
