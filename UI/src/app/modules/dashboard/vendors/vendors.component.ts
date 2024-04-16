import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../interfaces/vendor';
import { type PaginatedResponse } from '../../../interfaces/paginated-response';
import { type NzTableQueryParams } from 'ng-zorro-antd/table';
import { type TableParams } from '../../../interfaces/table-params';
import { VendorsService } from '../../../services/vendors.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  public pageTitle = 'Vendors';
  public vendors: PaginatedResponse<Vendor[]> = {
    page: 1,
    limit: 100,
    total: 0,
    results: [],
  };

  private initialLoad: boolean = false;

  constructor(private readonly vendorsService: VendorsService) {}

  ngOnInit(): void {
    this.initialLoad = true;
  }

  public params: TableParams = {
    page: 1,
    limit: 100,
  };

  public loading = false;

  onAddVendorClick(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;

    const queryParams: TableParams = {
      page: pageIndex,
      limit: pageSize,
    };

    this.loadVendors(queryParams);
  }

  loadVendors(params: TableParams): void {
    if (this.initialLoad) {
      this.vendorsService.fetchVendors(params).subscribe({
        next: (data): void => {
          console.dir(data);
        },
        error: (err): void => {
          console.warn(err);
          this.initialLoad = false;
        },
        complete: (): void => {
          this.loading = false;
          this.initialLoad = false;
        },
      });
    }
  }
}
