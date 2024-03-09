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


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateComponent,
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
    ]
})
export class CategoriesModule { }
