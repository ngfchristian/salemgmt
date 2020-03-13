import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { SaleManagementService } from '../sale-management.service';
import { IProduct } from 'src/app/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  productlist: Array<IProduct> = [];
  saleproductList: Array<IProduct> = [];
  selectedsale: IProduct;
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
  cashier = ''; // user who created the sale
  tel = ''; // user connected
  currentUser;
  errordisplay;
  salediscount = 0; // default value;
  saletaxe = 0; // default value


  // saleproductForm: FormGroup; // Main form FormGroup

  constructor(private commonservice: CommonService, private modalService: NgbModal,
              private service: SaleManagementService, private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.saleList(); // call for fetching the sales
  }


 /** Display the list of all sales of the system */
  saleList() {
    this.service.saleList()
    .subscribe((list) => {
      this.saleproductList = list.sale; // the json is deifned like json({sale: objct});
      this.saleproductList.forEach((element, index) => {
        element['productlist'].forEach((element, index) => {
          this.commonservice.getproductdetail(element['product'])
          .subscribe((product) => {
            element/* [i] */['product'] = product['name'];
            this.commonservice.get_unitbyid(product['unit'])
            .subscribe((unit) => {
              // console.log(`vvvvvvghh >>>${unit.unitdetail['name']}`);
              element/* [i] */['unit'] = unit.unitdetail['name'];
            });
          });
        });
      });

      // console.log(`id juire >>>${this.saleproductList[0]['_id']},
      //  datesale ${this.saleproductList[0]['datesale']}
      //  client ${this.saleproductList[0]['client']['cname']['fname']}`);
  });
  }


  parseDate(dateString: string): Date {
    return this.commonservice.parseDate(dateString);
  }

/** open the large modal in order to view the operation made*/

  openModal( exampleModalContent, selected) {
    this.selectedsale = selected;
    this.cashierdetail(selected['usercreate']);
    this.modalService.open( exampleModalContent, { size : 'lg' } );

    // console.log(`selected client ${this.selectedsale['client']['cname']['fname']},
    // selected client articles list ${this.selectedsale['productlist'].length},
    // quty ${this.selectedsale['productlist'][0]['quantity']}`);
  }

  price(value: number): any {
    // console.log(`subtotal> ${value}`);
    return this.commonservice.getformatCurrency(value);
  }

  /** get cashier detail */
  cashierdetail(id: any) {
   // name & tel if provided
   this.commonservice.get_users_by_Id(id)
        .subscribe((user) => {
          // this.detail = user.user;
          this.cashier = user.user['firstName'];
          this.tel = user.user['phoneNumber'];
        });
  }

     /** get the total discount when discount is applied pey line */
  totalcdiscount(list): any {
    let cdiscount = 0;
    list.forEach(element => {
      if (element['discountline']) {
        cdiscount +=  element['discountline'];
      }
    });
     return cdiscount;
  }

 /*  getAmount(list: any): any {
    // return list['quantity'] * list['delivery_price'];
   return this.commonservice.getformatCurrency(list['quantity'] * list['delivery_price']);
  } */

  getAmount(list: any): any {
    // return list['quantity'] * list['delivery_price'];
    let salediscountdefaulvalue = 0;
    if ( this.salediscount === 0) { // check the default value to apply the discount line
      if (list['discountline']) {
        salediscountdefaulvalue = list['discountline'];
        // this.cdiscount += salediscountdefaulvalue;
      }
    }
   return this.commonservice.getformatCurrency((list['quantity'] * list['sale_price']) - salediscountdefaulvalue);
  }

  getAmount2(list: any): any {
    // return list['quantity'] * list['delivery_price'];
    let dicountline = 0;
    let amount = 0;
    list.forEach(element => {
      dicountline = 0;
      if (element['discountline']) {
        dicountline += element['discountline'];
      }
      amount += (element['quantity'] * element['sale_price']) - dicountline;
    });
    // console.log(`total sale> ${amount}`);
   return this.commonservice.getformatCurrency(amount);
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

  valuechangeof(list): any {
    let total = 0;
    let dicountline = 0;
    let discount = 0;
    let taxe = 0;
    let paid = 0;
    list.forEach(element => {
      // dicountline = 0;
      if (element['discountline']) {
        dicountline += element['discountline'];
      }
    });
    if (list) {
      switch (this.saletaxe) {
        case 1: { // taxe is applied
          taxe = this.taxe;
          break;
        }
        case 0: { // taxe is not applied
          // nothing, the default value initialized above
          break;
        }
        default: {
          // nothing
          break;
        }
      }

      switch (this.salediscount) {
        case 1: { // global discount is applied
          discount = this.discount;
          break;
        }
        case 0: { // global discount is not applied
          // the discountline total become the discount
          discount = dicountline;
          break;
        }
        default: {
          // nothing
          break;
        }
      }
    }
    total = (((this.subTotal(list) * taxe) / 100) + this.subTotal(list)) - discount;
    // console.log(`total > ${total}, size:> ${list.length}, discount > ${discount}`);
    return total;
  }


  due(list): any {
    let paid = 0;
    if (list) {
      if (this.paid) {
        paid = this.paid;
      }
    }
    // if (this.valuechangeof() - paid > 0) {
    //   this.dueamount = this.valuechangeof() - paid;
    // } else {
    //   this.dueamount = this.valuechangeof();
    // }
    return (this.valuechangeof(list) - paid) > 0 ? (this.valuechangeof(list) - paid) : 0/* this.valuechangeof() */ /* : (paid - this.valuechangeof()) */;
  }

  balance(list): any {
    let paid = 0;
    if (list) {
      if (this.paid) {
        paid = this.paid;
      }
    }
    return (paid - this.valuechangeof(list)) > 0 ? (paid - this.valuechangeof(list)) : 0;
  }

  subTotal(list): any {
    let subtotal = 0;
    list.forEach(element => {
      // console.log(`quty> value > ${element['quantity']}, price> value > ${element['delivery_price']}`);
      subtotal += element['quantity'] * element['sale_price'];
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
