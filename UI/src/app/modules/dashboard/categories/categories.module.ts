import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateComponent } from './create/create.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {DashboardModule} from "../dashboard.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzTableModule} from "ng-zorro-antd/table";
import {ModalComponent} from "../../../components/modal/modal.component";
import { CategoryFormComponent } from './components/category-form/category-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {ButtonComponent} from "../../../components/button/button.component";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateComponent,
    CategoryFormComponent,
  ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        NzButtonModule,
        NzSpaceModule,
        NzWaveModule,
        DashboardModule,
        NzDividerModule,
        NzIconModule,
        NzPopconfirmModule,
        NzTableModule,
        ModalComponent,
        ReactiveFormsModule,
        NzFormModule,
        ButtonComponent,
        NzInputModule,
    ]
})
export class CategoriesModule { }
