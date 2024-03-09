import { Component } from '@angular/core';
import {PaginatedResponse} from "../../../interfaces/paginated-response";
import {Category} from "../../../interfaces/category";
import {TableParams} from "../../../interfaces/table-params";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CategoriesService} from "../../../services/categories.service";

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
  loading: boolean = false;
  deletingCategory: boolean = false;

  constructor(private categoriesService: CategoriesService) {
  }

  onAddCategoryClick() {
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
}
