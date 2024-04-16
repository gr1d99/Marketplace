import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../../services/shared/message.service';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get<T>(url: string) {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  post<Response>(url: string, data: object) {
    return this.http
      .post<Response>(url, data)
      .pipe(catchError(this.handleError));
  }

  put<Response>(url: string, data: object) {
    return this.http
      .put<Response>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete<Response>(url: string) {
    return this.http.delete<Response>(url);
  }

  private handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client side error
      const { message } = error.error;
      errorMessage = message;
      console.group('Client Side Error');
      console.warn(errorMessage);
      console.groupEnd();
    } else {
      // server side error
      errorMessage = error?.error?.message || `Something went wrong`;
      console.group('Server Side Error');
      console.warn(error);
      console.groupEnd();
    }

    return throwError(() => {
      return new Error(errorMessage);
    });
  }
}
