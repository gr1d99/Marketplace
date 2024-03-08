import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "../registration/signup/signup.component";
import {APP_ROUTES} from "../../../shared/constanst";
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";
import {Helpers} from "../../../helpers";
import {logoutGuard} from "../../../guards/logout.guard";

const routes: Routes = [
  {
    path: APP_ROUTES.auth,
    children: [
      {
        path: Helpers.generateRouteFromSegments(APP_ROUTES.login),
        component: LoginComponent,
      },
      {
        path: Helpers.generateRouteFromSegments(APP_ROUTES.logout),
        component: LogoutComponent,
        canActivate: [logoutGuard]
      },
      {
        path: Helpers.generateRouteFromSegments(APP_ROUTES.signup),
        component: SignupComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
