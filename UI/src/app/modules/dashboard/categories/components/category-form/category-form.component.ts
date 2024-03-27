import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryFormData} from "../../../../../interfaces/category";
import {FormService} from "../../../../../services/shared/form.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  isUpdate: boolean = false;
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })
  @Input() loading: boolean = false;
  @Input() initialData: Subject<CategoryFormData> = new Subject<CategoryFormData>();
  @Output() onSubmit: EventEmitter<CategoryFormData> = new EventEmitter();
  @Input() formActionSuccess: Subject<boolean> = new EventEmitter();

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
    this.formActionSuccess.subscribe((created) => {
      if (created) {
        this.form.reset();
      }
    })

    this.initialData.subscribe(value => {
      if (value?.name || value?.description) {
        this.isUpdate = true;
        this.form.patchValue(value);
      }
    })
  }

  ngOnDestroy(): void {
    this.isUpdate = false;
    this.formActionSuccess.unsubscribe();
    this.initialData.unsubscribe();
  }
}
