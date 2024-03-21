import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {mergeMap, Observable, switchMap, tap} from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";
import {Helpers} from "../helpers";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authenticationService.authToken();

    if (Helpers.isNullOrUndefined(authToken)) {
      return next.handle(request);
    }

    const nextRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    })

    return next.handle(nextRequest);
  }
}
