import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ProductsService} from "../../../../services/products.service";
import {Product} from "../interfaces/product";
import {MessageService} from "../../../../services/shared/message.service";
import {Helpers} from "../../../../helpers";
import {APP_ROUTES} from "../../../../shared/constanst";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  public pageTitle: string = 'Update Product'
  public submitting: boolean = false;
  public loading: boolean = false;
  public product: Product | null = null;
  private productId: string = ''

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private productService: ProductsService,
              private messageService: MessageService) {
  }

  onUpdateProduct(data: object) {
    this.submitting = true;

    this.productService.updateProduct(this.productId, data).subscribe({
      next: () => {
        this.messageService.successMessage('Product updated successfully')
        this.router.navigate([Helpers.generateRouteFromSegments(APP_ROUTES.dashboardProducts)])
      },
      error: (err) => {
        this.messageService.errorMessage(err?.message ?? 'The product was not updated!')
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      }
    })
  }

  ngOnInit(): void {
    this.startLoader();

    this.route.params.subscribe((params: Params & Partial<{ productId: string }>) => {
      const productId = params.productId;

      if (!productId) {
        this.stopLoader();
        this.location.back();
        return;
      }

      this.productId = productId;
      this.loadProduct(productId);
    })
  }

  private loadProduct(productId: string) {
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        this.stopLoader();
      }
    })
  }

  private startLoader() {
    this.loading = true;
  }

  private stopLoader() {
    this.loading = false;
  }
}
