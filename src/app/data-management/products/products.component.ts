import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataManagementService } from '../data-management.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { IProduct } from 'src/app/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productlist: Array<IProduct> = [];
  loading = false;
  errordisplay: string;


  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private service: DataManagementService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.productList(/* '5d9704a105024c5c681013b2' */); // cal for fetching the products
  }

  /** Display the list of all products of the system */
  productList(/* cat: any */) {
    this.service.get_allproducts(/* cat */)
    .subscribe((productlist) => {
      this.productlist = productlist.product;
      // console.log(`id juire >>>${this.productlist.length} abs ${this.productlist[0]['unitproduct'][0]['name']}`);
  });
  }

  /** remove product item from the list.
   *  in case of completion, dismiss all the model windows**/
  removeTodoItem(id: any) {
    this.service.deleteproduct(id)
    .subscribe((product) => {
      for (let i = 0; i <= this.productlist.length; i++) {
      // this.productlist.forEach(element => {
        if (id === this.productlist[i]['_id']) {
          this.productlist.splice(i, 1);
        }
      }
      this.modalService.dismissAll();
    },
    error => {
      // define actions when errors occured during the action process
      console.log('error occured... ' + error.status );
      let message;
      // if (error.status === 404) {
      //   message = 'Produt not found';
      // }
      // if (error.status === 400) {
      //   message = 'An error occured in the process';
      // }
      this.alertService.error(message);
      this.errordisplay = message;
      this.loading = false;
    });
  }

  /** open the small modal in order to confirm the operation*/
  openSmallModal( smallModalContent ) {
    this.modalService.open( smallModalContent, { size : 'sm' } );
  }

}
