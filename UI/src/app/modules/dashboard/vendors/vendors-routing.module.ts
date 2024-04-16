import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { VendorsComponent } from './vendors.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
