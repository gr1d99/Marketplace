import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { Router } from "@angular/router";
import { MessageService } from "../../../services/shared/message.service";
import { Helpers } from "../../../helpers";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private messagesService: MessageService,
  ) {}

  ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe((isAuthenticated) => {
      const logoutUrl = `/${Helpers.commonRoutes.authLogout}`;
      if (this.router.url.match(logoutUrl)) {
        if (isAuthenticated) {
          this.authenticationService.logoutUser().subscribe((value) => {
            const loginUrl = `/${Helpers.commonRoutes.authLogin}`;

            if (!value) {
              this.router.navigate([loginUrl]);
            }
          });
        } else {
          const logoutUrl = `/${Helpers.commonRoutes.authLogin}`;
          this.router.navigate([logoutUrl]);
        }
      }
    });
  }
}
