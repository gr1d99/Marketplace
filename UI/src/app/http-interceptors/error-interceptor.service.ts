import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {APP_ROUTES} from "../shared/constanst";
import {Router} from "@angular/router";
import {MessageService} from "../services/shared/message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (_error) => {
          if (_error instanceof HttpErrorResponse) {
            this.handleHTTPResponse(_error)
          }
          // figure out what to do
        }
      })
    )
  }

  public handleHTTPResponse(response: HttpErrorResponse) {
    const { status, error } = response;

    switch (status) {
      case 0: {
        return this.router.navigate([APP_ROUTES.error])
      }
      case 403: {
        this.messageService.errorMessage(error?.message || "Forbidden")
        return this.router.navigate([APP_ROUTES.login])
      }

      default: {
        return
      }
    }
  }
}
