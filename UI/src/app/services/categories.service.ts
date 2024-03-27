import { Injectable } from '@angular/core';
import {PaginatedResponse} from "../interfaces/paginated-response";
import {Category, CategoryFormData} from "../interfaces/category";
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

  create(params: Pick<Category, 'name' | 'description'>) {
    return this.httpApi.post<Category>(this.baseUrl, params);
  }

  get(categoryId: string) {
    return this.httpApi.get<Category>(this.baseUrl + `/` + categoryId)
  }

  update(categoryId: string, data: CategoryFormData) {
    return this.httpApi.put<Category>(this.baseUrl + `/` + categoryId, data)
  }

  delete(categoryId: string) {
    return this.httpApi.delete<null>(this.baseUrl + `/` + categoryId)
  }
}
