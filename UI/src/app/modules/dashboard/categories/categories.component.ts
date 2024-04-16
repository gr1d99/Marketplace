import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PaginatedResponse } from "../../../interfaces/paginated-response";
import { Category } from "../../../interfaces/category";
import { TableParams } from "../../../interfaces/table-params";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { CategoriesService } from "../../../services/categories.service";
import { BehaviorSubject, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../../services/shared/message.service";

type CategoryAction = "CREATE" | "UPDATE";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent {
  pageTitle = "Categories";
  categories: PaginatedResponse<Category> = {
    page: 1,
    limit: 10,
    total: 0,
    results: [],
  };
  categoryParams: TableParams = {
    page: 1,
    limit: 10,
  };
  loading: boolean = true;
  deletingCategory: boolean = false;
  categoryModalVisible: Subject<boolean> = new Subject<boolean>();
  categoryModalTitle: string = "Add Category";
  categoryAction: BehaviorSubject<CategoryAction> =
    new BehaviorSubject<CategoryAction>("CREATE");

  @Input() categoryCreatedEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  onAddUpdateCategoryClick(
    action: CategoryAction = "CREATE",
    categoryId: string | null = null,
  ) {
    this.categoryAction.next(action);

    if (action === "UPDATE") {
      this.categoryModalTitle = "Update Category";

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          categoryId: categoryId,
        },
      });
    }

    if (action === "CREATE") {
      this.categoryModalTitle = "Add Category";

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
    }

    this.categoryModalVisible.next(true);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex } = params;

    const queryParams: TableParams = {
      page: pageIndex,
      limit: pageSize,
    };

    this.loadCategories(queryParams);
  }

  loadCategories(params: TableParams) {
    this.loading = true;
    this.categoriesService.getCategories(params).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }

  isDeleted(data: Category) {
    return data.deletedAt !== null;
  }

  deleteCategory(categoryId: string) {
    this.loading = true;

    this.categoriesService.delete(categoryId).subscribe({
      next: () => {
        this.messageService.successMessage("Category deleted successfully!");
      },
      error: () => {
        this.loading = false;
        this.messageService.errorMessage("Category could not be deleted!");
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  cancel = () => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });

    this.categoryModalVisible.next(false);
  };

  categoryChanged(value: boolean) {
    if (value) {
      this.loadCategories(this.categoryParams);
      this.cancel();
    }
  }
}
