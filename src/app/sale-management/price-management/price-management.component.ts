import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { SaleManagementService } from '../sale-management.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { IProduct } from 'src/app/models/product.model';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';

@Component({
  selector: 'app-price-management',
  templateUrl: './price-management.component.html',
  styleUrls: ['./price-management.component.scss']
})
export class PriceManagementComponent implements OnInit {


  // saleproductForm: FormGroup; // Main form FormGroup

  constructor(private commonservice: CommonService,
              private service: SaleManagementService, private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }
  productlist: Array<IProduct> = [];
  // saleproductList: Array<IProduct> = [];
  // selectedsale: IProduct;
  // stylethead = 'table-info';
  // requiredsaledate = 'sale date is required';
  // requiredclientname = 'client name is required';
  // quantity = 1;
  // salingprice = 0;
  // subtotal = 0;
  // discount = 0;
  // paid = 0;
  // dueamount = 0;
  // loading = false;
  // submitted = false;
  // taxe = 0;
  // client;
  // datesale;
  // cashier = ''; // user who created the sale
  // tel = ''; // user connected
  valuedifferent = true;
  currentUser;
  errordisplay;

  currencysymbol = this.commonservice.getCurrencySymbolof(); // GHS or USD or XAF
  localcurencyname = this.commonservice.getLocaleCurrencyNamef(); // Cedi or US Dollar or CFA Franc BEAC or CFA franc BCEAO
  localcurrencysymbol = this.commonservice.getLocaleCurrencySymbolof(); // ₵ or $ or ₣(for BEAC and BCEAO))

  ngOnInit() {
    this.productList(); // call for fetching the products
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
  }

  /** Display the list of all products of the system */
  productList(/* cat: any */) {
    this.commonservice.get_allproducts(/* cat */)
    .subscribe((productlist) => {
      this.productlist = productlist.product;
      // console.log(`pricing >>>${this.productlist.length}
      // delivery price1 ${this.productlist[0]['price']}
      // delivery price2 ${this.productlist[0]['delivery_price']}`);

      this.productlist.forEach((element, i) => {

        // 1. Sort the delivery_price array based of date delivery in descending order
        this.productlist[i]['delivery_price'].sort(
          function(a, b) {
            return a['delivery_price'] > b['delivery_price'] ? 1 : -1;
          }
        );
        /**# end 1. #*/

        // 2. Sort the selling_price array based of date delivery in descending order
        this.productlist[i]['selling_price'].sort(
          function(a, b) {
            return a['selling_price'] > b['selling_price'] ? 1 : -1;
          }
        );
         /**# end 2. #*/

        this.productlist[i]['delivery_price'] = this.productlist[i]['delivery_price'].length > 0 ? this.productlist[i]['delivery_price'][0]['price'] : 0;
        this.productlist[i]['selling_price'] = this.productlist[i]['selling_price'].length > 0 ? this.productlist[i]['selling_price'][0]['price'] : 0;
        this.productlist[i]['selling_priceii'] = this.productlist[i]['selling_price'];
      });

      // this.productlist[3]['delivery_price'].forEach((element, i) => {
      //   console.log(`price ${i} >>>${element['price']}`);
      // });
      // this.productlist[0]['selling_price'].forEach((element, i) => {
      //   console.log(`price ${i} >>>${element['price']}`);
      // });
      // console.log(`price ${0} >>>${this.productlist[0]['price']}`);
  });
  }

  valuesave(product: any) {

      let productlist = Array<any>();
      product['product'] = product['_id'];
      product['usercreate'] = this.currentUser._id;
      productlist.push(product);
      const newProductList = {
        productlist: productlist
      };
      this.service.saveNewProductPrice(newProductList)
            .pipe(first())
            .subscribe((data) => {
              // selling price saved successfully ..> now, action after this...
              // this.modalService.dismissAll();
              // this.router.navigate(['/sale-management/sales']);
            },
            error => {
              console.log('error occured... ' + error.status );
              let message;
              if (error.status === 404) {
                message = 'The selling price of the product cannot be updated';
              }
              if (error.status === 500) {
                message = 'An error with the server occured in the process';
              }
              this.alertService.error(message);
              this.errordisplay = message;
              // this.loading = false;
            });
  }

  price(value: number): any {
    // console.log(`subtotal> ${value}`);
    return this.commonservice.getformatCurrency(value);
  }

  valuechangeTable(value, column: any, i: any, salingprice) {
    // this.saleproductList[i][column] = value.target.value;
    // console.log(`salingprice valid ${salingprice.valid}`);
    // console.log(`salingprice dirty ${salingprice.dirty}`);
    // console.log(`salingprice invalid ${salingprice.invalid}`);
    // console.log(`salingprice pristine ${salingprice.pristine}`);
    // console.log(`value current ${value.target.value}, value initial> ${this.productlist[i]['selling_priceii']}`);
    this.valuedifferent = this.productlist[i][column] === this.productlist[i]['selling_priceii'] ? true : false
    this.productlist[i][column] = value.target.value;
  }

  diff(tot: any, column): any {
    console.log(`value current ${tot[column]}, value initial> ${tot['selling_priceii']}`);
    return tot[column] === tot['selling_priceii'] ? true : false;
  }
}

