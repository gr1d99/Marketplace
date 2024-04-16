import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CategoryFormData } from "../../../../interfaces/category";
import { CategoriesService } from "../../../../services/categories.service";
import { MessageService } from "../../../../services/shared/message.service";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent {
  loading: boolean = false;

  categoryCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() onCategoryChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private categoriesService: CategoriesService,
    private messagesService: MessageService,
  ) {}
  handleCreate(data: CategoryFormData) {
    this.loading = true;

    this.categoriesService.create(data).subscribe({
      next: () => {
        this.messagesService.successMessage("Category created successfully!");
        this.categoryCreatedEvent.emit(true);
        this.onCategoryChange.emit(true);
      },
      error: () => {
        this.loading = false;
        this.onCategoryChange.emit(true);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
