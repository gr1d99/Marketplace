import { Component } from '@angular/core';
import {PaginatedResponse} from "../../../interfaces/paginated-response";
import {Category, CategoryFormData} from "../../../interfaces/category";
import {TableParams} from "../../../interfaces/table-params";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CategoriesService} from "../../../services/categories.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  pageTitle = "Categories"
  categories: PaginatedResponse<Category> = {
    page: 1,
    limit: 10,
    total: 0,
    results: []
  }
  categoryParams: TableParams = {
    page: 1,
    limit: 10
  }
  loading: boolean = true;
  deletingCategory: boolean = false;
  categoryModalVisisble: Subject<boolean> = new Subject<boolean>();

  constructor(private categoriesService: CategoriesService) {
  }

  onAddCategoryClick() {
    this.categoryModalVisisble.next(true);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex} = params

    const queryParams: TableParams = {
      page: pageIndex,
      limit: pageSize
    }

    this.loadCategories(queryParams);
  }

  loadCategories(params: TableParams) {
    this.loading = true;
    this.categoriesService
        .getCategories(params)
        .subscribe({
          next: data => {
            this.categories = data
          },
          error: err => {},
          complete: () => {
            this.loading = false
          }
        })
  }

  isDeleted(data: Category) {
    return data.deletedAt !== null;
  }

  deleteCategory(categoryId: string) {}
  cancel = () => {
    this.categoryModalVisisble.next(false);
  }

  handleCreate(data: CategoryFormData) {
    this.loading = true;

    this.categoriesService.create(data).subscribe({
      next: (response) => {
        this.loadCategories(this.categoryParams);
      },
      error: (error) => {
        console.log({error})
      },
      complete: () => {
        this.loading = false;
        console.log({ h: this.loading })
      }
    })
  }
}
