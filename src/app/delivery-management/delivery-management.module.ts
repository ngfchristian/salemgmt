import { NgModule } from '@angular/core';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DeliverySettingComponent } from './delivery-setting/delivery-setting.component';
import { DeliveryserviceService } from './deliveryservice.service';
import { TosaveArticlelistComponent } from './delivery-detail/tosave-articlelist/tosave-articlelist.component';

const routes: Routes = [
{ path: 'delivery', component: DeliveryListComponent },
{ path: 'delivery/delivery-detail', component: DeliveryDetailComponent },
{ path: 'delivery/delivery-detail/:id', component: DeliveryDetailComponent },
{ path: 'delivery-setting', component: DeliverySettingComponent }
];


@NgModule({
  declarations: [DeliveryListComponent, DeliveryDetailComponent, DeliverySettingComponent, TosaveArticlelistComponent],
  imports: [
     // CommonModule,
     SharedModule,
     RouterModule.forChild(routes)
   ],
   // All services
   providers: [
     DeliveryserviceService
   ]
})
export class DeliveryManagementModule { }
