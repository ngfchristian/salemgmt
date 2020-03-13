import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { SaleManagementService } from '../sale-management.service';
import { IProduct } from 'src/app/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
// import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  productlist: Array<IProduct> = [];
  saleproductList: Array<IProduct> = [];
  stylethead = 'table-info';
  requiredsaledate = 'sale date is required';
  requiredclientname = 'client name is required';
  quantity = 1;
  subtotal = 0;
  discount = 0;
  paid = 0;
  dueamount = 0;
  loading = false;
  submitted = false;
  taxe = 0;
  client;
  datesale;
  cashier = ''; // user connected
  currentUser;
  errordisplay;
  // saleproductForm: FormGroup; // Main form FormGroup

  constructor(private commonservice: CommonService, private modalService: NgbModal,
              private service: SaleManagementService, private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.productList(/* '5d9704a105024c5c681013b2' */); // cal for fetching the products
  /*   this.saleproductForm = this.fb.group({
      products: this.fb.array([]) // contains multiple rows of FormGroup. Each tr row is a FormGroup
    }); */
  }



  /** Display the list of all products of the system */
  productList(/* cat: any */) {
    this.commonservice.get_allproducts(/* cat */)
    .subscribe((productlist) => {
      this.productlist = productlist.product;
      console.log(`id juire >>>${this.productlist[0]['_id']}`);
  });
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }


  /** function to add new delivery
   *  Implementation of the addition of a delivery:
   * - user entered the necessary elements
   * - redirect to another page : deivery list after the success of the process
   * - in case you click on cancel, just go back to the previous page: delivery list without affecting the system state
   */
  onSubmit($event) {
    this.submitted = true;
    // console.log('start: click on save button.....' +     this.deliverytosave[0]['quantity']+ ' length: '+    this.deliverytosave.length);
    let client = { cname: {fname: this.client }};
    let newProductList = {
      productlist: this.saleproductList,
      datesale: this.datesale,
      client: client,

    };

    this.loading = true;
    // newProductList['productlist'].forEach(element => {
    //   console.log(`${element['delivery_price']}, quty: ${element['quantity']}, product: ${element['product']},
    //    _id: ${element['id']}`);
    // });
    console.log(`${newProductList['datesale']}, v ddd> ${this.datesale} ,
     client: ${newProductList['client']['cname']['fname']},
    //  agent: ${newProductList['client']['cname']['fname']}`);
    newProductList['productlist'].forEach(element => {
      element['product'] = element['_id'];
      console.log(`${element['quantity']},
      _id ${element['_id']},
      product: ${element['product']},
      ${element['delivery_price']}`);
      
    });
    if (localStorage.getItem('carpcurrentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
       // console.log('login... ' + this.currentUser.email);
       // this.detail['usermodified'] = localStorage.getItem('currentUser')['email'];
      }
    this.service.saveNewSale(newProductList)
            .pipe(first())
            .subscribe((data) => {
              // send success message to the user and redirect
              console.log('saving the sale result... ' + data );
              this.router.navigate(['/sale-management/sales']);
            },
            error => {
              console.log('error occured... ' + error.status );
              let message;
              if (error.status === 404) {
                message = 'Produt not found';
              }
              if (error.status === 400) {
                message = 'An error occured in the process';
              }
              if (error.status === 500) {
                message = 'An error occured in the process';
              }
              this.alertService.error(message);
              this.errordisplay = message;
              this.loading = false;
            });

  }



  removeProducta(index: number) {
    this.saleproductList.splice(index, 1); // removing selected product from the salling list
  }
  /**what happened when we click on cancel button */
  addArticleToList(event: any): void {
    console.log(`value name>>: ${event['name']}, id>${event['_id']}, quantity>${event['quantity']}, ${event}`);
    /* if (this.saleproductList.includes(event)) { */ // the saling list contains the selected element
      /* this.saleproductList.find(result => {
        return result['quantity'] += event['quantity'];
      });
    } else { // no
      this.addPorduct(event);
    } */
    const element = this.saleproductList.indexOf(event);
    element === -1 ? this.addPorduct(event) : this.saleproductList[element]['quantity'] += 1/* event['quantity'] */;
  }

  openModal( exampleModalContent ) {
    this.modalService.open( exampleModalContent, { size : 'lg' } );
    console.log(`client> ${this.client}, datesale :> ${this.datesale}`);
  }


  addPorduct(item: any) {
    // let newProductList = { id: item['_id'] , delivery_price: 0, name: item['name'], product: item['_id'], quantity: 0 };
    item['quantity'] = 1;
    if(!item['delivery_price']) item['delivery_price'] = 0;
    this.saleproductList.push(item);
  }
  price(value: number): any {
    return this.commonservice.getformatCurrency(value);
  }

  getAmount(list: any): any {
    // return list['quantity'] * list['delivery_price'];
   return this.commonservice.getformatCurrency(list['quantity'] * list['delivery_price']);
  }

  currencysymbol = this.commonservice.getCurrencySymbolof(); // GHS or USD or XAF
  localcurencyname = this.commonservice.getLocaleCurrencyNamef(); // Cedi or US Dollar or CFA Franc BEAC or CFA franc BCEAO
  localcurrencysymbol = this.commonservice.getLocaleCurrencySymbolof(); // ₵ or $ or ₣(for BEAC and BCEAO))

  styleTHead(index: any): any {
    return this.stylethead = index % 2 === 0 ? 'table-info' : 'table-danger';
  }

  valuechangeTable(value: any, column: any, i: any) {
    this.saleproductList[i][column] = value.target.value;
  }

  valuechangeof(): any {
    let total = 0;
    let discount = 0;
    let taxe = 0;
    let paid = 0;
    if (this.saleproductList) {
      if (this.discount && this.taxe) {
        discount = this.discount;
        taxe = this.taxe;
      } else {
        if (this.discount) {
          discount = this.discount;
        }
        if (this.taxe) {
          taxe = this.taxe;
        }
      }
    }
    total = /* (this.subTotal() ) + */ (((this.subTotal() * taxe) / 100) + this.subTotal()) - discount;
    // console.log(`total > ${total}, size:> ${this.saleproductList.length}, discount > ${discount}`);
    return total;
  }

  due(/* item: any */): any {
    let paid = 0;
    if (this.saleproductList) {
      if (this.paid) {
        paid = this.paid;
      }
    }
    // if (this.valuechangeof() - paid > 0) {
    //   this.dueamount = this.valuechangeof() - paid;
    // } else {
    //   this.dueamount = this.valuechangeof();
    // }
    return (this.valuechangeof() - paid) > 0 ? (this.valuechangeof() - paid) : 0/* this.valuechangeof() */ /* : (paid - this.valuechangeof()) */;
  }

  balance(): any {
    let paid = 0;
    if (this.saleproductList) {
      if (this.paid) {
        paid = this.paid;
      }
    }
    return (paid - this.valuechangeof()) > 0 ? (paid - this.valuechangeof()) : 0;
  }

  subTotal(): any {
    let subtotal = 0;
    this.saleproductList.forEach(element => {
      // console.log(`quty> value > ${element['quantity']}, price> value > ${element['delivery_price']}`);
      subtotal += element['quantity'] * element['delivery_price'];     
    });
    this.subtotal = subtotal;
    return subtotal;
   }



   convertNumberToWords(amount): any {
       var words = new Array();
       words[0] = '';
       words[1] = 'One';
       words[2] = 'Two';
       words[3] = 'Three';
       words[4] = 'Four';
       words[5] = 'Five';
       words[6] = 'Six';
       words[7] = 'Seven';
       words[8] = 'Eight';
       words[9] = 'Nine';
       words[10] = 'Ten';
       words[11] = 'Eleven';
       words[12] = 'Twelve';
       words[13] = 'Thirteen';
       words[14] = 'Fourteen';
       words[15] = 'Fifteen';
       words[16] = 'Sixteen';
       words[17] = 'Seventeen';
       words[18] = 'Eighteen';
       words[19] = 'Nineteen';
       words[20] = 'Twenty';
       words[30] = 'Thirty';
       words[40] = 'Forty';
       words[50] = 'Fifty';
       words[60] = 'Sixty';
       words[70] = 'Seventy';
       words[80] = 'Eighty';
       words[90] = 'Ninety';
       amount = amount.toString();
       var atemp = amount.split(".");
       var number = atemp[0].split(",").join("");
       var n_length = number.length;
       var words_string = "";
       if (n_length <= 9) {
           var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
           var received_n_array = new Array();
           for (var i = 0; i < n_length; i++) {
               received_n_array[i] = number.substr(i, 1);
           }
           for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
               n_array[i] = received_n_array[j];
           }
           for (var i = 0, j = 1; i < 9; i++, j++) {
               if (i === 0 || i === 2 || i === 4 || i === 7) {
                   if (n_array[i] === 1) {
                       n_array[j] = 10 + /* parseInt( */n_array[j]/* ) */;
                       n_array[i] = 0;
                   }
               }
           }
           var value;
           for (var i = 0; i < 9; i++) {
               if (i === 0 || i === 2 || i === 4 || i === 7) {
                   value = n_array[i] * 10;
               } else {
                   value = n_array[i];
               }
               if (value != 0) {
                   words_string += words[value] + " ";
               }
               if ((i === 1 && value != 0) || (i === 0 && value != 0 && n_array[i + 1] === 0)) {
                   words_string += "Crores ";
               }
               if ((i === 3 && value != 0) || (i === 2 && value != 0 && n_array[i + 1] === 0)) {
                   words_string += "Lakhs ";
               }
               if ((i === 5 && value != 0) || (i === 4 && value != 0 && n_array[i + 1] === 0)) {
                   words_string += "Thousand ";
               }
               if (i === 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                   words_string += "Hundred and ";
               } else if (i === 6 && value != 0) {
                   words_string += "Hundred ";
               }
           }
           words_string = words_string.split("  ").join(" ");
       }
       return words_string;
  }

}
