import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Helpers } from "../helpers";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    router.navigate([Helpers.commonRoutes.authLogin], {
      queryParams: {
        next: state.url,
      },
    });

    return false;
  }

  return authService.isAuthenticated;
};
