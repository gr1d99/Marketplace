import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryFormData} from "../../../../interfaces/category";
import {CategoriesService} from "../../../../services/categories.service";
import {MessageService} from "../../../../services/shared/message.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  categoryUpdatedEvent: EventEmitter<boolean> = new EventEmitter();
  loading: boolean = false;
  data: Subject<CategoryFormData> = new Subject<CategoryFormData>();
  categoryId: string = '';
  @Output() onCategoryChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private categoriesService:  CategoriesService,
              private messagesService: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;

    this.route.queryParams.subscribe((params: Params & { categoryId?: string }) => {
      const categoryId = params?.categoryId;

      if (categoryId) {
        this.categoryId = categoryId;

        this.categoriesService.get(categoryId).subscribe({
          next: data => {
            this.data.next({
              name: data.name,
              description: data.description
            })
          },
          error: (_error) => {
            this.loading = false;
            this.messagesService.errorMessage('There was an error!');
          },
          complete: () => {
            this.loading = false;
          }
        })
      }
    })
  }

  ngOnDestroy() {
  }

  handleUpdate(data: CategoryFormData) {
    this.loading = true;

    this.categoriesService.update(this.categoryId, data).subscribe({
      next: () => {
        this.messagesService.successMessage('Category updated successfully!')
        this.categoryUpdatedEvent.emit(true);
        this.onCategoryChange.emit(true);
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
