import { Injectable } from '@angular/core';
import {HttpApiService} from "../core/services/http-api.service";
import {AuthenticatedResponse} from "../interfaces/authenticated-response";
import {environment} from "../../environments/environment";
import {MessageService} from "./shared/message.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly jwtTokenKey = '@marketplaceJwtToken'
  private readonly refreshTokenKey = '@marketplaceRefreshToken'
  private baseUrl = environment.ApiBaseUrl
  private url = this.baseUrl + '/auth'
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authToken: BehaviorSubject<null | string> = new BehaviorSubject<string | null>(null);
  public refreshToken: BehaviorSubject<null | string> = new BehaviorSubject<string | null>(null);
  constructor(private httpService: HttpApiService,
              private messageService: MessageService) {
    this.checkAuthentication()
  }

  public isLoggedIn() {
    return this.isAuthenticated.asObservable()
  }

  public authenticate(payload: { email: string, password: string }) {
    return this.httpService.post<AuthenticatedResponse>(this.url, payload).subscribe((response) => {
      this.messageService.successMessage("Logged in!")

      return this.storeTokens(response);
    })
  }

  private storeTokens(tokens: AuthenticatedResponse) {
    const { jwtToken, refreshToken } = tokens;
    localStorage.setItem(this.jwtTokenKey, jwtToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isAuthenticated.next(true);

    return this.isAuthenticated.asObservable();
  }

  private checkAuthentication() {
    try {
      const jwtToken = localStorage.getItem(this.jwtTokenKey);
      const refreshToken = localStorage.getItem(this.refreshTokenKey)

      if (typeof jwtToken === null) {
        this.isAuthenticated.next(false);
        return;
      }

      this.isAuthenticated.next(true)
      this.authToken.next(jwtToken);

      if (typeof refreshToken === null) {
        return;
      }

      this.refreshToken.next(refreshToken)
    } catch (e) {
      console.warn(e)
      this.isAuthenticated.next(false);
    }
  }
}
