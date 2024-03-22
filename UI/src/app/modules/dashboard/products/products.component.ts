import {Component, OnInit} from '@angular/core';
import {PaginatedResponse} from "../../../interfaces/paginated-response";
import {Product} from "../../../interfaces/product";
import {Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {MessageService} from "../../../services/shared/message.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

type ProductParams = {
  page: number,
  limit: number
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pageTitle = "Products"
  loading = true;
  deletingProduct = false;
  productParams: ProductParams = {
    page: 1,
    limit: 10,
  }

  products: PaginatedResponse<Product> = {
    ...this.productParams,
    total: 0,
    results: []
  }
  constructor(private router: Router,
              private productsService: ProductsService,
              private message: MessageService) {
  }

  ngOnInit() {
    this.loadProducts(this.productParams);
  }

  onAddProductClick() {
    this.router.navigate(['dashboard/products/create'])
  }

  loadProducts(params: ProductParams) {
    this.loading = true;
    this.productsService
        .getProducts(params).subscribe({
      next: (data) => {
        this.products = data
      },
      error: (err) => {
        console.warn(err)
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex} = params

    const queryParams: ProductParams = {
      page: pageIndex,
      limit: pageSize
    }

    this.loadProducts(queryParams);
  }

  deleteProduct(productId: string) {
    this.deletingProduct = true
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.message.successMessage("Product deleted successfully")
        this.loadProducts(this.productParams)
      },
      error: (err: any) => {
        this.message.errorMessage("The selected product was not deleted, try again!")
        this.deletingProduct = false;
      },
      complete: () => {
        this.deletingProduct = false;
      }
    })
  }

  isDeleted(product: Product) {
    return product.deletedAt !== null
  }
}
