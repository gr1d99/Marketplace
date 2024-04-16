import { Component, type OnInit } from '@angular/core';
import { type PaginatedResponse } from '../../../interfaces/paginated-response';
import { type Product } from '../../../interfaces/product';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { MessageService } from '../../../services/shared/message.service';
import { type NzTableQueryParams } from 'ng-zorro-antd/table';

interface ProductParams {
  page: number;
  limit: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  pageTitle = 'Products';
  loading = true;
  deletingProduct = false;
  productParams: ProductParams = {
    page: 1,
    limit: 10,
  };

  products: PaginatedResponse<Product> = {
    ...this.productParams,
    total: 0,
    results: [],
  };

  constructor(
    private readonly router: Router,
    private readonly productsService: ProductsService,
    private readonly message: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts(this.productParams);
  }

  async onAddProductClick(): Promise<void> {
    await this.router.navigate(['dashboard/products/create']);
  }

  loadProducts(params: ProductParams): void {
    this.loading = true;
    this.productsService.getProducts(params).subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.warn(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;

    const queryParams: ProductParams = {
      page: pageIndex,
      limit: pageSize,
    };

    this.loadProducts(queryParams);
  }

  deleteProduct(productId: string): void {
    this.deletingProduct = true;
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.message.successMessage('Product deleted successfully');
        this.loadProducts(this.productParams);
      },
      error: (err: any) => {
        this.message.errorMessage(
          'The selected product was not deleted, try again!'
        );
        this.deletingProduct = false;
        console.warn(err);
      },
      complete: () => {
        this.deletingProduct = false;
      },
    });
  }

  isDeleted(product: Product): boolean {
    return product.deletedAt !== null;
  }
}
