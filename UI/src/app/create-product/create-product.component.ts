import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/shared/message.service";
import {Router} from "@angular/router";
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  pageTitle = "Add Product"
  submitting = false;
  constructor(private message: MessageService,
              private productsServices: ProductsService,
              private router: Router) {}

  ngOnInit() {
    return
  }

  onCreateProduct(value: object) {
    this.submitting = true;
    this.productsServices.createProduct(value).subscribe({
      next: () => {
        this.submitting = false;
        this.message.successMessage("Product created")
        this.router.navigate(['/dashboard/products'])
      },
      error: () => {
      this.submitting = false
      this.message.errorMessage("Something went wrong")
      },
      complete: () => {
        console.log('ddd')
      }
    })
  }
}
