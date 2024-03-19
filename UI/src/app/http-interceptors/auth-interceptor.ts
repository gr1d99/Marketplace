import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";
import {Helpers} from "../helpers";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authorizationService.getAuthToken();

    if (Helpers.isNullOrUndefined(authToken)) {
      return next.handle(request);
    }

    const nextRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    })

    console.log({ nextRequest })

    return next.handle(nextRequest);
  }
}
