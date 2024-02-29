import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../interfaces/category";
import {ProductsService} from "../../services/products.service";
import {ProductStatus} from "../../interfaces/product-status";
import {Product} from "../../products-table/interfaces/product";

type TypedSimpleChange<T> = Omit<SimpleChange, 'previousValue' | 'currentValue'> & {
  previousValue: T,
  currentValue: T
}

type TypedSimpleChanges<T> = {
  [K in keyof T]: TypedSimpleChange<T[K]>
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() submitting = false;
  @Input() submitLabel: 'Create Product' | 'Update Product' = 'Create Product';
  @Input() product: Product | null = null;
  @Output() formSubmitted = new EventEmitter<object>();

  categoryParams = {
    page: 1,
    limit: 100
  }
  productStatusesParams = {
    page: 1,
    limit: 100
  }
  categories: Category[] = [];
  productStatuses: ProductStatus[] = []

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discountedPrice: ['', [Validators.required]],
    productStatusId: [0, [Validators.required]],
    categoryId: [0, [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productsServices: ProductsService) {
  }

  ngOnChanges(changes: TypedSimpleChanges<{ product: null | Product }>) {
    if (changes.product !== null) {
      if (changes.product.currentValue !== null) {
        this.updateFormValues()
      }
    }
  }

  updateFormValues() {
    if (this.product === null) return;

    this.productForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price.toString(),
      discountedPrice: this.product.discountedPrice.toString(),
      categoryId: this.product.categoryId,
      productStatusId: this.product.productStatusId
    })
  }

  ngOnInit() {
    this.getCategories();
    this.getStatuses();
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.productForm.value)
  }

  getCategories() {
    this.categoriesService.getCategories(this.categoryParams).subscribe((categories) => {
      this.categories = categories.results;
    })
  }

  getStatuses(){
    this.productsServices.getStatuses(this.productStatusesParams).subscribe(statuses => {
      this.productStatuses = statuses.results;
    })
  }
}
