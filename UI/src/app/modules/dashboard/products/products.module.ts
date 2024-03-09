import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CreateComponent } from './create/create.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {DashboardHeaderComponent} from "../../../components/dashboard-header/dashboard-header.component";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  declarations: [
    ProductsComponent,
    // CreateComponent,
    // DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTableModule,
    // NzWaveModule,
    // NzPageHeaderModule
  ]
})
export class ProductsModule { }
