import { Component } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { MessageService } from "../../../../services/shared/message.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent {
  pageTitle: string = "Add new Product";
  submitting: boolean = false;

  constructor(
    private productsServices: ProductsService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  onCreateProduct(value: object) {
    this.submitting = true;
    this.productsServices.createProduct(value).subscribe({
      next: () => {
        this.submitting = false;
        this.messageService.successMessage("Product created");
        this.router.navigate(["/dashboard/products"]);
      },
      error: () => {
        this.submitting = false;
        this.messageService.errorMessage("Something went wrong");
      },
      complete: () => {
        console.log("ddd");
      },
    });
  }
}
