import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../shared/constanst";
import {MessageService} from "../../../services/shared/message.service";
import {Helpers} from "../../../helpers";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messagesService: MessageService) {
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log({ 1: isAuthenticated})
        this.authenticationService.logoutUser().subscribe(value => {
          const loginUrl = Helpers.generateRouteFromSegments(["/", APP_ROUTES.auth, "/", APP_ROUTES.login]);

          if (!value) {
            console.log({ 2: value })
            this.messagesService.successMessage('You have been logged out!');
            this.router.navigate([loginUrl]);
          } else {
            this.messagesService.errorMessage("An error occurred while logging you out, please try again")
          }
        })
      } else {
        console.log({ 3: isAuthenticated })
        const logoutUrl = Helpers.generateRouteFromSegments(["/", APP_ROUTES.auth, "/", APP_ROUTES.login]);
        this.router.navigate([logoutUrl]);
      }
    })
  }
}
