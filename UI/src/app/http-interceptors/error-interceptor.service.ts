import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { APP_ROUTES } from "../shared/constanst";
import { Router } from "@angular/router";
import { MessageService } from "../services/shared/message.service";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (_error) => {
          if (_error instanceof HttpErrorResponse) {
            this.handleHTTPResponse(_error);
          }
          // figure out what to do
        },
      }),
    );
  }

  public handleHTTPResponse(response: HttpErrorResponse) {
    const { status } = response;

    switch (status) {
      case 0: {
        return this.router.navigate([APP_ROUTES.error]);
      }
      case 403: {
        return;
      }
      case 401: {
        this.messageService.errorMessage("Your session has expired!");
        this.authService.logoutUser();
        return;
      }
      case 500: {
        return;
      }
      default: {
        return;
      }
    }
  }
}
