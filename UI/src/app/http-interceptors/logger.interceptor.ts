import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { correlationId } from 'simple-correlation-id';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const withCorrelate = request.clone({
      headers: request.headers.set('X-Correlation-ID', correlationId() ?? 'anonymous') });
    return next.handle(withCorrelate);
  }
}
