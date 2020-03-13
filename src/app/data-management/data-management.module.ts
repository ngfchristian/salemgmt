import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { ProductSettingComponent } from './product-setting/product-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DataManagementService } from './data-management.service';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'product-setting', component: ProductSettingComponent },
  { path: 'products/product-detail', component: ProductDetailComponent },
  { path: 'products/product-detail/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [ProductsComponent, ProductSettingComponent, ProductDetailComponent],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  // All services
  providers: [
    DataManagementService
  ]
})
export class DataManagementModule { }
