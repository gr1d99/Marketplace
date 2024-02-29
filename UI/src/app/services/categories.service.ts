import { Injectable } from '@angular/core';
import {PaginatedResponse} from "../interfaces/paginated-response";
import {Category} from "../interfaces/category";
import {HttpApiService} from "../core/services/http-api.service";
import {environment} from "../../environments/environment";
import {ApiServiceBase} from "./api-service-base";
import {HttpGetParams} from "../interfaces/http-get-params";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiServiceBase {
  private baseUrl = `${environment.ApiBaseUrl}/categories`
  constructor(private httpApi: HttpApiService) {
    super()
  }

  getCategories(params?: HttpGetParams) {
    return this.httpApi.get<PaginatedResponse<Category>>(this.getUrlWithParams(this.baseUrl, params))
  }
}
