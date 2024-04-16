import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpApiService } from '../core/services/http-api.service';
import { HttpGetParams } from '../interfaces/http-get-params';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Vendor } from '../interfaces/vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorsService {
  private readonly baseUrl = environment.ApiBaseUrl;
  private readonly vendorsUrl = this.baseUrl + '/vendors';
  constructor(private readonly httpService: HttpApiService) {}

  fetchVendors(params: HttpGetParams): Observable<PaginatedResponse<Vendor>> {
    const qs = new URLSearchParams(params);
    const url = `${this.vendorsUrl}?${qs.toString()}`;
    return this.httpService.get(url);
  }
}
