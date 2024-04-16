import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            m => m.CategoriesModule
          ),
      },
      {
        path: 'vendors',
        loadChildren: () =>
          import('./vendors/vendors.module').then(m => m.VendorsModule),
      },
      // { path: 'products', component: ProductsTableComponent, title: 'Products' },
      // { path: 'products/create', component: CreateProductComponent, title: 'New Product' },
      // { path: 'products/:id/update', component: UpdateProductComponent, title: 'Update Product' }
    ],
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
