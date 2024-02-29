import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authorizationService.getAuthToken();

    if (authToken === null) {
      return next.handle(request);
    }

    const nextRequest = request.clone({
      headers: request.headers.set('Authorization', authToken)
    })

    return next.handle(nextRequest);
  }
}
