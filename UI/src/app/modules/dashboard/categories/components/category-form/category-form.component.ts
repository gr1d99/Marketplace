import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryFormData} from "../../../../../interfaces/category";
import {FormService} from "../../../../../services/shared/form.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })
  @Input() loading: boolean = false;
  @Output() onSubmit: EventEmitter<CategoryFormData> = new EventEmitter();
  @Input() categoryCreatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  submit() {
    if (!this.form.valid) {
      this.formService.markFieldsInvalid(this.form);
      return;
    }

    this.onSubmit.emit(this.form.value as CategoryFormData)
  }

  ngOnInit(): void {
    this.categoryCreatedEvent.subscribe((created) => {
      if (created) {
        this.form.reset();
      }
    })
  }

  ngOnDestroy(): void {
    this.categoryCreatedEvent.unsubscribe();
  }
}
