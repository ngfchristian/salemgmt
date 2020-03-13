import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataManagementService } from '../data-management.service';
import { IProduct } from 'src/app/models/product.model';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';
import { IUnit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  detail: IProduct[];
  id: any;
  productdetailForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errordisplay: string;
  requiredproductname = 'product name is required';
  requiredpassword = 'Password is required';
  diplayupload = false;
  currentUser;
  unitlist;
  SelectedItem: IUnit;

  constructor(private router: Router,
              private activatedroute: ActivatedRoute,
              private service: DataManagementService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private commonservice: CommonService,
              private authenticationService: AuthenticationService
              ) {
                // this.onEditproduct(this.detail);
              }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params['id'];
    // console.log(`id >>> ${this.id}`);
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
    this.listUnit();
    if (this.id) {
    this.service.getproductdetail(this.id/* '5da71d90a1c4c24c1d6553e4' */)/* 5da71d90a1c4c24c1d6553e4 */
        .subscribe((productdetail) => {

            this.detail = productdetail;
            console.log(`product name ${this.detail['name']},
            product quantity ${this.detail['quantity']} product
            description ${this.detail['description']} image url ${this.detail['imgurl']}`);
            this.onEditproduct(this.detail);
        });
    }

    this.onFormControl(); // control or verify the form

    // this.onEditproduct();
  }

  /**what happened when we click on cancel button */
  Cancel() {
    this.router.navigate(['/products']);
  }

  onEditproduct(product: any) {
    console.log(`tp display product name>> ${product['name']}`);
    this.formproductdetail.productname.setValue(product['name']);
    this.formproductdetail.reference.setValue(product['reference']);
    this.formproductdetail.description.setValue(product['description']);
    // value of unit
    this.unitlist.forEach(element => {
      if (element['_id'] === product['unit']) {
        this.SelectedItem = element;
      }
      
    });
    // this.formproductdetail.price.setValue(this.detail['price']);
    // this.formproductdetail.quantity.setValue(this.detail['quantity']);
  }

  /** function to add new rpoduct*/
  onSubmit() {
    /** Implementation of the addition of a product:
    * - user entered the necessary elements
    * - redirect to another page : product list after the success of the process
    * - in case you click on cancel, just go back to the previous page: product list without affecting the system state
    */
  
    this.submitted = true;
    console.log('start: click on add porduct button.....');
    // let sdetail: new IProduct();
    if (localStorage.getItem('carpcurrentUser')) {
      console.log('login... i am logged');
      // this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
    let sdetail = {
      name : this.formproductdetail.productname.value,
      reference : this.formproductdetail.reference.value,
      description : this.formproductdetail.description.value,
      /* unit : this.formproductdetail.unit.value */
      unit : this.SelectedItem['_id'],
      usercreate: this.currentUser._id // user id of he who create the product
    };

    this.loading = true;
  //  this.detail['id'] = this.id;
  console.log(`id ${sdetail.unit}`);
    this.service.SaveNewProduct(sdetail)
            .pipe(first())
            .subscribe((data) => {
              /** Success of the modification, goback to the previous page: product list */
              // success of the operation
              console.log('je suis update3... ' + data );
              this.router.navigate(['/products']); // refress that product liste
            },
                error => {
                  console.log('je suis error... ' + error.status );
                  let message;
                  if (error.status === 404) { // No user found
                    message = 'Produt not found';
                  }
                  if (error.status === 400) { // error
                    message = 'Email or password invalid';
                  }
                  this.alertService.error(message);
                  this.errordisplay = message;
                  this.loading = false;
                  console.log('je suis error2... ' + this.errordisplay );
                });
    console.log('je suis error3... ' + this.errordisplay );
    
    }


    selectUnit(event: any): void {
      // if (event.target.checked) { // use it in case of checkbox
        // if (event.target.value) {
          
          // console.log(`default value: ${event.target.name.name}`);
        if (event === 'default') {
          console.log(`default value: ${event}`);
        } else {
          console.log(`value name>>: ${event['name']}, id>${event['_id']}, ${event}`);
          this.SelectedItem = event;
        }
    }




  /** function to save the modifications made */
  onSaveEdit() {
    /** Implementation of the modification of a product:
    * - ust apply the necessary changes
    * - redirect to another page : product list after the success of the process
    * - in case you click on cancel, just go back to the previous page: product list
    */

    this.submitted = true;
    console.log('start: click on save modification.....');

    this.loading = true;
    this.detail['name'] = this.formproductdetail.productname.value;
    this.detail['id'] = this.id;
    this.detail['reference'] = this.formproductdetail.reference.value;
    this.detail['description'] = this.formproductdetail.description.value;
    if (localStorage.getItem('carpcurrentUser')) {
      // this.currentUser = this.authenticationService.carpcurrentUserValue;
      this.detail['usermodified'] = this.currentUser._id;
    }
    this.detail['unit'] = this.SelectedItem['_id'],

    this.service.EditProduct(this.id, this.detail)
            .pipe(first())
            .subscribe((data) => {
              /** Success of the modification, goback to the previous page: product list */
              // success of the operation
              console.log('je suis update3... ' + data );
              this.router.navigate(['/products']); // refress that product liste
            },
                error => {
                  console.log('je suis error... ' + error.status );
                  let message;
                  if (error.status === 404) { // No user found
                    message = 'Produt not found';
                  }
                  if (error.status === 400) { // error
                    message = 'Email or password invalid';
                  }
                  this.alertService.error(message);
                  this.errordisplay = message;
                  this.loading = false;
                  console.log('je suis error2... ' + this.errordisplay );
                });
    console.log('je suis error3... ' + this.errordisplay );
    }

  listUnit() {
      this.commonservice.get_allunits()
      .subscribe((unit) => {

          this.unitlist = unit.unit;
          console.log(`id unit >>>${this.unitlist[0]['_id']}`);
      });
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
    this.productdetailForm = this.formBuilder.group({
    productname: ['', Validators.required],
    reference: ['', ''],
    description: ['', '']
  });
  }

  // convenience getter for easy access to form fields
  get formproductdetail() {
    return this.productdetailForm.controls;
  }

  /** action on the checbox */
  changeToupload(event) {
    if (event.target.checked) {
     this.diplayupload = true/* !this.errordisplay */;
    } else {
      this.diplayupload = false;
    }
    // event.target.checked?:this.errordisplay|!this.diplayupload;
  }

}
