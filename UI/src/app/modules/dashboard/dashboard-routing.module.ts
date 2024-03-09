import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
    { path: "dashboard", component: DashboardComponent, children: [
        { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
        // { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
            // { path: 'products', component: ProductsTableComponent, title: 'Products' },
            // { path: 'products/create', component: CreateProductComponent, title: 'New Product' },
            // { path: 'products/:id/update', component: UpdateProductComponent, title: 'Update Product' }
        ]
    },
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
