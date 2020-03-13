import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { DeliveryserviceService } from '../deliveryservice.service';
import { IDELIVERY } from 'src/app/models/delivery.model';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { IProduct } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';
import { DataManagementService } from 'src/app/data-management/data-management.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss']
})
export class DeliveryDetailComponent implements OnInit {
  detail: IDELIVERY[];
  deliverytosave: any;
  product: IProduct[];
  id: any;
  deliverydetailForm: FormGroup;
  deliveryuploadForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errordisplay: string;
  requireddeliverydate = 'delivery date is required';
  requiredclientname = 'client name is required';
  requiredagentname = 'agent name is required';
  requireddescription = 'description is required';
  requiredpassword = 'Password is required';
  diplayupload = false;
  currentUser;


  constructor(private router: Router,
              private activatedroute: ActivatedRoute,
              private service: DeliveryserviceService,
              private data: DataManagementService,
              private common: CommonService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private commonservice: CommonService,
              private authenticationService: AuthenticationService) {
                this.onFormControl(); // control of verify thing in the form
              }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params['id'];
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
    if (this.id) {
      // console.log(`id >>> ${this.id}`);
      this.service.getdeliverydetail(this.id)
          .subscribe((deliverydetail) => {
              this.detail = deliverydetail;
              // console.log(`product name ${this.detail['description']}`);
              // let i = 0;
              this.detail['productlist'].forEach((element, index) => {
                this.getproductName(element['product'], index);
                // console.log(`product> ${element['product']}, unit> ${element['unit']}, name> ${element['name']} `);
                // this.detail['productlist'][i]['name'] = this.getproductName(element['product'])['name'];
                // i++;
              });
              this.onEditdelivery(this.detail);
          });
    }


    // this.onFormControl(); // control of verify thing in the form
    this.uploadFormControl();
  }

  // getTotaldelivery(list: Array<any>): any {
  //   let deliveryamount = 0;
  //   list.forEach(element => {
  //     deliveryamount += element['quantity'];
  //   });
  //   return deliveryamount;
  // }

getproductName(id: any, i: any): any {
 this.data.getproductdetail(id)
  .subscribe((product) => {
    // return detail['name'];
    // console.log(`product name ${product['name']}`);
    this.detail['productlist'][i]['product'] = product['name'];
    this.getunitName(product['unit'], i);
    // return product;
    // this.onEditdelivery(this.detail);
  });
}

getunitName(id: any, i: any) {
  this.common.get_unitbyid(id)
  .subscribe((unit) => {
    // return detail['name'];
    // console.log(`product name ${unit.unitdetail['name']}`);
    this.detail['productlist'][i]['unit'] = unit.unitdetail['name'];
    // return product;
    // this.onEditdelivery(this.detail);
  });
  // return udetail['name'];
}

  onProductListChanged($newlist) {
    // console.log(`listproduct changed:, ${$newlist}`);
    this.product = $newlist;
    this.deliverytosave = $newlist;
  }

  getlength(list: any): any {
    return list['productlist'];
  }

  price(value: number): any {
    return this.commonservice.getformatCurrency(value);
  }

  getAmount(list: any): any {
    // return list['quantity'] * list['delivery_price'];
   return this.commonservice.getformatCurrency(list['quantity'] * list['delivery_price']);
  }

  /**what happened when we click on cancel button */
  Cancel() {
    this.router.navigate(['/delivery-management/delivery']);
  }


  /** function to add new delivery
   *  Implementation of the addition of a delivery:
   * - user entered the necessary elements
   * - redirect to another page : deivery list after the success of the process
   * - in case you click on cancel, just go back to the previous page: delivery list without affecting the system state
   */
  onSubmit($event) {
    this.submitted = true;
    let client = { cname: {fname: this.formproductdetail.clientname.value}};
    let agent = { aname: {fname: this.formproductdetail.agentname.value}};
    let newProductList = {
      productlist: this.product,
      datedelivery: this.formproductdetail.datedelivery.value,
      client: client,
      agent: agent,
      description: this.formproductdetail.description.value,
      usercreate: this.currentUser._id // user id of he who creates the delivery
    };

    this.loading = true;

    // console.log(`${newProductList['datedelivery']},
    //  client: ${newProductList['client']['cname']['fname']},
    //  agent: ${newProductList['agent']['aname']['fname']},
    //  description: ${newProductList['description']},
    //  usercreate: ${newProductList['usercreate']},
    //  products: ${newProductList['productlist'].length},
    // //  `);

    this.service.getsaveNewDelivery(newProductList)
            .pipe(first())
            .subscribe((data) => {
              // send success message to the user and redirect
              console.log('saving the delivery result... ' + data );
              this.router.navigate(['/delivery-management/delivery']);
            },
            error => {
              console.log('error occured... ' + error.status );
              let message;
              if (error.status === 404) {
                message = 'Cannot execute the process';
              }
              if (error.status === 400) {
                message = 'An error occured in the process';
              }
              if (error.status === 500) { // internal error
                message = 'An internal server error occured in the process';
              }
              this.alertService.error(message);
              this.errordisplay = message;
              this.loading = false;
            });

  }


  onEditdelivery(delivery: any) {
    this.formproductdetail.datedelivery.setValue(delivery['datedelivery']);
    this.formproductdetail.reference.setValue(delivery['reference']);
    this.formproductdetail.description.setValue(delivery['description']);
    this.formproductdetail.clientname.setValue(delivery['client']['cname']['fname']);
    this.formproductdetail.agentname.setValue(delivery['agent']['aname']['fname']);
    this.formproductdetail.usercreate.setValue(delivery['usercreate']);
  }


      /**
   * This function control the form regarding the required fields.
   * Currently, the form is having two fields that are required
   * @field productname: required
   * @field reference: not required
   * @field description: not required
   * The function doesn't have a return value, it just performs simple verrification operations
   */
  onFormControl() {
    this.deliverydetailForm = this.formBuilder.group({
    datedelivery: ['', Validators.required],
    reference: ['', ''],
    clientname: ['', Validators.required],
    agentname: ['', Validators.required],
    description: ['', ''],
    usercreate: ['', '']
  });
  }

  uploadFormControl() {
    this.deliveryuploadForm = this.formBuilder.group({
    fileupoad: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get formproductdetail() {
    return this.deliverydetailForm.controls;
  }

    /** action on the checbox */
    changeToupload(event) {
      // if (event.target.checked) {
      //  this.diplayupload = true;
      // } else {
      //   this.diplayupload = false;
      // }
      this.diplayupload = event.target.checked ? true : false;
      // event.target.checked?:this.errordisplay|!this.diplayupload;
    }

}
