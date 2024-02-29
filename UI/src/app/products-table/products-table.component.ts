import {Component, OnInit} from '@angular/core';
import {Product} from "./interfaces/product";
import {Router} from "@angular/router";
import {ProductsService} from "../services/products.service";
import {PaginatedResponse} from "../interfaces/paginated-response";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {MessageService} from "../services/shared/message.service";

type ProductParams = {
  page: number,
  limit: number
}
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
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
      .getProducts(params)
      .subscribe(data => {
        this.products = data
      }, () => {
        return
      },
      () => {
        this.loading = false;
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
        console.log({err})
        this.message.errorMessage("The selected product was not deleted, try again!")
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
