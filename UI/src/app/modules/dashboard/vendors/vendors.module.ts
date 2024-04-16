import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { DashboardModule } from '../dashboard.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ButtonComponent } from '../../../components/button/button.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [VendorsComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    DashboardModule,
    NzSpaceModule,
    NzButtonModule,
    ButtonComponent,
    NzTableModule,
  ],
})
export class VendorsModule {}
