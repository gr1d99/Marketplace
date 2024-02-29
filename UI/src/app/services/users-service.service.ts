import { Injectable } from '@angular/core';
import {NewUser, User} from "../interfaces/user";
import {HttpApiService} from "../core/services/http-api.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private baseUrl = environment.ApiBaseUrl
  private registrationUrl = this.baseUrl + '/registrations'
  constructor(private httpApi: HttpApiService) { }

  createUser(data: NewUser) {
    return this.httpApi.post<User>(this.registrationUrl, data)
  }
}
