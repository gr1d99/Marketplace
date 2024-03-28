import { Injectable } from '@angular/core';
import {HttpApiService} from "../core/services/http-api.service";
import {AuthenticatedResponse} from "../interfaces/authenticated-response";
import {environment} from "../../environments/environment";
import {MessageService} from "./shared/message.service";
import {BehaviorSubject, tap} from "rxjs";
import {Helpers} from "../helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly jwtTokenKey = '@marketplaceJwtToken'
  private readonly refreshTokenKey = '@marketplaceRefreshToken'
  private baseUrl = environment.ApiBaseUrl
  private url = this.baseUrl + '/auth'
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public refreshToken: BehaviorSubject<null | string> = new BehaviorSubject<string | null>(null);
  constructor(private httpService: HttpApiService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
    this.checkAuthentication()
  }

  public get isLoggedIn() {
    return this.isAuthenticated.getValue();
  }

  public authToken (): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }

  public authenticate(payload: { email: string, password: string }) {
    return this.httpService.post<AuthenticatedResponse>(this.url, payload).subscribe((response) => {
      this.messageService.successMessage("Logged in!")

      const redirectUrl = this.route.snapshot.queryParams?.['next'];

      this.storeTokens(response);

      if (redirectUrl) {
        this.router.navigateByUrl(redirectUrl)

        return;
      }

      return;
    })
  }

  public logoutUser() {
    localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isAuthenticated.next(false);
    this.messageService.successMessage('You have been logged out!');
    return this.isAuthenticated.asObservable();
  }

  private storeTokens(tokens: AuthenticatedResponse) {
    const { jwtToken, refreshToken } = tokens;

    localStorage.setItem(this.jwtTokenKey, jwtToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);

    this.isAuthenticated.next(true);
  }

  private checkAuthentication() {
    try {
      const jwtToken = localStorage.getItem(this.jwtTokenKey);
      const refreshToken = localStorage.getItem(this.refreshTokenKey)

      if (Helpers.isNullOrUndefined(jwtToken)) {
        this.isAuthenticated.next(false);
        return;
      }

      this.isAuthenticated.next(true);

      if (Helpers.isNullOrUndefined(refreshToken)) {
        return;
      }

      this.refreshToken.next(refreshToken)
    } catch (e) {
      console.warn(e)
      this.isAuthenticated.next(false);
    }
  }
}
