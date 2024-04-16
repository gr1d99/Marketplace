import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

export const logoutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  return authService.isAuthenticated;
};
