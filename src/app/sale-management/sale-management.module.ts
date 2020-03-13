import { NgModule } from '@angular/core';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleSettingComponent } from './sale-setting/sale-setting.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { SaleTosavearticleComponent } from './sale-detail/sale-tosavearticle/sale-tosavearticle.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SaleManagementService } from './sale-management.service';
import { SalemodalComponent } from './sale-detail/salemodal/salemodal.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { PriceManagementComponent } from './price-management/price-management.component';

const routes: Routes = [
{ path: 'sales', component: SaleListComponent },
{ path: 'sales/newsale', component: NewSaleComponent },
{ path: 'sales/sales-detail/:id', component: SaleDetailComponent },
{ path: 'sale-setting', component: SaleSettingComponent },
{ path: 'price-management', component: PriceManagementComponent },
{ path: 'salemodal', component: SalemodalComponent }
];


@NgModule({
  declarations: [SaleListComponent,
  SaleSettingComponent,
  SaleDetailComponent,
  SaleTosavearticleComponent,
  SalemodalComponent,
  NewSaleComponent,
  PriceManagementComponent],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  // All services
  providers: [
    SaleManagementService
  ]
})
export class SaleManagementModule { }
