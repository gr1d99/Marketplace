import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import  { ApmService, ApmModule, ApmErrorHandler } from "@elastic/apm-rum-angular";

import { NzLayoutModule } from "ng-zorro-antd/layout";

import { ProductFormComponent } from './components/product-form/product-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import { ProductsTableComponent } from './products-table/products-table.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzMessageModule} from "ng-zorro-antd/message";
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import { ButtonComponent } from './components/button/button.component';
import {AuthenticationModule} from "./modules/authentication/authentication.module";
import { CardComponent } from './components/card/card.component';
import {NzCardModule} from "ng-zorro-antd/card";
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import {NzResultModule} from "ng-zorro-antd/result";
import {AuthInterceptor} from "./http-interceptors/auth-interceptor";
import {ErrorInterceptor} from "./http-interceptors/error-interceptor.service";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    DashboardComponent,
    ProductsTableComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DashboardHeaderComponent,
    NotFoundComponentComponent
  ],
  imports: [
    // APM
    ApmModule,

    // Angular
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Routing
    AuthenticationModule,
    AppRoutingModule,

    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzTypographyModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzCardModule,
    CardComponent,
    ButtonComponent,
    NzResultModule,
    ButtonComponent,
  ],
  providers: [
    ApmService,
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [
    CardComponent,
    ButtonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(service: ApmService) {
    const apm = service.init({
      serviceName: 'Market Place UI',
      serverUrl: 'http://localhost:8200'
    })
    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    })
  }
}
