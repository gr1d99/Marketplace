import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { UpdateProductComponent } from "./update-product/update-product.component";

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "create", component: CreateProductComponent },
  {
    path: ":productId/update",
    component: UpdateProductComponent,
    title: "Update Product",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
