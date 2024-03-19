import {Component, EventEmitter, Output} from '@angular/core';
import {PaginatedResponse} from "../../../interfaces/paginated-response";
import {Category, CategoryFormData} from "../../../interfaces/category";
import {TableParams} from "../../../interfaces/table-params";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CategoriesService} from "../../../services/categories.service";
import {Subject} from "rxjs";
import {MessageService} from "../../../services/shared/message.service";

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
  categoryModalVisible: Subject<boolean> = new Subject<boolean>();

  @Output() categoryCreatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private categoriesService: CategoriesService,
              private messagesService: MessageService) {
  }

  onAddCategoryClick() {
    this.categoryModalVisible.next(true);
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
    this.categoryModalVisible.next(false);
  }

  handleCreate(data: CategoryFormData) {
    this.loading = true;

    this.categoriesService.create(data).subscribe({
      next: () => {
        this.messagesService.successMessage('Category created successfully!')
        this.loadCategories(this.categoryParams);
        this.categoryCreatedEvent.emit(true);
        this.categoryModalVisible.next(false);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
