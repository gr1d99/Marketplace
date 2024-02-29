import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../services/products.service";
import {Product} from "../products-table/interfaces/product";
import {MessageService} from "../services/shared/message.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  pageTitle = "Update Product"
  submitting = false;
  public product: Product | null = null;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private message: MessageService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId !== null) {
      this.productsService.getProduct(productId).subscribe({
        next: product => {
          this.product = product;
        }
      })
    } else {
      this.message.errorMessage('Unable to find product to update!')
      this.location.back()
    }
  }

  onUpdateProduct(value: object) {
    if (this.product === null) {
      return
    }

    this.submitting = true;
    this.productsService.updateProduct(this.product.productId, {...this.product, ...value}).subscribe({
      next: () => {
        this.message.successMessage('Product updated successfully!')
        this.router.navigate(['/dashboard/products'])
      },
      error: () => {
        this.message.errorMessage('Unable to update product')
      },
      complete: () => {
        this.submitting = false
      }
    })
  }
}
