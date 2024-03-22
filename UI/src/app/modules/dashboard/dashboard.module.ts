import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NavItemComponent} from "../../components/nav-item/nav-item.component";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {DashboardHeaderComponent} from "./components/dashboard-header/dashboard-header.component";
import {NzSpinModule} from "ng-zorro-antd/spin";

@NgModule({
    declarations: [
        SidebarComponent,
        NavItemComponent,
        DashboardComponent,
        DashboardHeaderComponent,
    ],
    exports: [
        DashboardHeaderComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        NzPageHeaderModule,
        NzSpinModule
    ]
})
export class DashboardModule { }
