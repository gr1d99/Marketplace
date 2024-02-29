import {HttpGetParams} from "../interfaces/http-get-params";

export class ApiServiceBase {
  getUrlWithParams(baseUrl: string, params?: HttpGetParams) {
    const queryString = new URLSearchParams(params)
    return queryString ? baseUrl + `?${queryString}` : baseUrl;
  }
}
