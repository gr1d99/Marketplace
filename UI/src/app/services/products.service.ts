import { Injectable } from '@angular/core';
import {HttpApiService} from "../core/services/http-api.service";
import {environment} from "../../environments/environment";
import {PaginatedResponse} from "../interfaces/paginated-response";
import {HttpGetParams} from "../interfaces/http-get-params";
import {ProductStatus} from "../interfaces/product-status";
import {Product} from "../products-table/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = environment.ApiBaseUrl
  private productsUrl = this.baseUrl + '/products'
  constructor(private httpApi: HttpApiService) { }

  getStatuses(params?: HttpGetParams) {
    const queryString = new URLSearchParams(params)
    const baseUrl = this.baseUrl + '/product-statuses'
    const url = queryString ? baseUrl + `?${queryString}` : baseUrl
    return this.httpApi.get<PaginatedResponse<ProductStatus>>(url)
  }

  createProduct(data: object) {
    return this.httpApi.post<Product>(this.productsUrl, data)
  }

  getProducts(params: HttpGetParams) {
    const queryString = new URLSearchParams(params)
    const url = this.productsUrl + `?${queryString}`;
    return this.httpApi.get<PaginatedResponse<Product>>(url);
  }

  getProduct(id: string) {
    return this.httpApi.get<Product>(this.productsUrl + `/${id}`)
  }

  updateProduct(id: string, data: object) {
    const url = this.productsUrl + `/${id}`
    return this.httpApi.put<Product>(url, data)
  }

  deleteProduct(productId: string){
    const url = this.productsUrl + `/${productId}`;
    return this.httpApi.delete(url);
  }
}
