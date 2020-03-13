import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataManagementService } from 'src/app/data-management/data-management.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';
import { SaleManagementService } from '../sale-management.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit {
  salediscount = 0; // default value;
  consistencymessage = '';
  saletaxe = 0; // default value
  id: any;
  currentUser;
  saleproductList;
  cashier = 'Bernard';
  subtotal = 0;
  discount = 0;
  taxe = 0;
  paid = 0;


  currencysymbol = this.commonservice.getCurrencySymbolof(); // GHS or USD or XAF
  localcurencyname = this.commonservice.getLocaleCurrencyNamef(); // Cedi or US Dollar or CFA Franc BEAC or CFA franc BCEAO
  localcurrencysymbol = this.commonservice.getLocaleCurrencySymbolof(); // ₵ or $ or ₣(for BEAC and BCEAO))


  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    // private service: DataManagementService,
    private service: SaleManagementService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commonservice: CommonService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    
    this.id = this.activatedroute.snapshot.params['id'];
    console.log(`iddd ${this.id}`);
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }    
    if (this.id) {
    //   this.service.saleList()
    //   .subscribe((list) => {
    //     this.saleproductList = list.sale;
    // });


      
      this.service.getsaledetail(this.id)
      .subscribe((productdetail) => {
        console.log(`dd ${productdetail}
        ss ${productdetail['productlist']}`);
          this.saleproductList = productdetail;
      });

    }
  }


  price(value: number): any {
    return this.commonservice.getformatCurrency(value);
  }

  subTotal(): any {
    let subtotal = 0;
    let salediscountdefaulvalue = 0;
    this.saleproductList.forEach(element => {
      salediscountdefaulvalue = 0;
      // console.log(`quty> value > ${element['quantity']}, price> value > ${element['delivery_price']}`);
      if ( this.salediscount === 0) { // check the default value to apply the discount line
        if (element['discountline']) {
          salediscountdefaulvalue = element['discountline'];
        }
      }
      subtotal += ((element['quantity'] * element['delivery_price']) - salediscountdefaulvalue);
    });
    this.subtotal = subtotal;
    return subtotal;
   }

   getAmount(list: any): any {
    // return list['quantity'] * list['delivery_price'];
    let salediscountdefaulvalue = 0;
    if ( this.salediscount === 0) { // check the default value to apply the discount line
      if (list['discountline']) {
        salediscountdefaulvalue = list['discountline'];
        // this.cdiscount += salediscountdefaulvalue;
      }
    }
   return this.commonservice.getformatCurrency((list['quantity'] * list['delivery_price']) - salediscountdefaulvalue);
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
