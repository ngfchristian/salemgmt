import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { DeliveryserviceService } from '../deliveryservice.service';
import { IDELIVERY } from 'src/app/models/delivery.model';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
// import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliverylist: Array<IDELIVERY> = [];
  // productlist: Array<IProduct> = [];

  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private service: DeliveryserviceService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commonservice: CommonService) { }

  ngOnInit() {
    this.deliveryList();
  }

  /** Display the list of all deliveries of the system */
  deliveryList(/* cat: any */) {
    this.service.get_alldeliveries(/* cat */)
    .subscribe((deliverylistresult) => {
      this.deliverylist = deliverylistresult.delivery;
      // this.productlist = deliverylistresult['productlist'];
  });
  }

  getTotaldelivery(list: Array<any>): any {
    let deliveryamount = 0;
    list.forEach(element => {
      deliveryamount += (element['quantity'] * element['delivery_price']);
    });
    return this.commonservice.getformatCurrency(deliveryamount);
  }

  formatDate(value: any): any {
    return this.commonservice.getformatDate(value);
  }

  // remove product item from the list
  removeTodoItem(product: any) {

  }

}
