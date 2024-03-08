import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private authService: AuthenticationService) { }

  public getAuthToken() {
    return this.authService.authToken.value;
  }
}
