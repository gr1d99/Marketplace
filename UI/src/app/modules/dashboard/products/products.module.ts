import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzWaveModule } from "ng-zorro-antd/core/wave";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { NzFormModule } from "ng-zorro-antd/form";
import { ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { ButtonComponent } from "../../../components/button/button.component";
import { DashboardModule } from "../dashboard.module";
import { CreateProductComponent } from "./create-product/create-product.component";
import { CardComponent } from "../../../components/card/card.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { ComponentsComponent } from "./components/components.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ComponentsComponent,
  ],
  imports: [
    CommonModule,

    // router
    ProductsRoutingModule,

    // nz-zorro
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTableModule,
    NzWaveModule,
    NzPageHeaderModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,

    // custom
    ButtonComponent,
    CardComponent,

    // shared
    DashboardModule,
    NzSpinModule,
  ],
})
export class ProductsModule {}
