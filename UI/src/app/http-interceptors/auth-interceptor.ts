import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { first, mergeMap, Observable } from "rxjs";
import { Helpers } from "../helpers";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authenticationService.authToken();

    return this.authenticationService.$isLoggedIn.pipe(first()).pipe(
      mergeMap((isAuthenticated) => {
        if (isAuthenticated) {
          if (Helpers.isNullOrUndefined(authToken)) {
            return next.handle(request);
          }

          const authRequest = request.clone({
            headers: request.headers.set(
              "Authorization",
              `Bearer ${authToken}`,
            ),
          });

          return next.handle(authRequest);
        }

        return next.handle(request);
      }),
    );
  }
}
