import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';
import { DataManagementService } from 'src/app/data-management/data-management.service';


@Component({
  selector: 'app-tosave-articlelist',
  templateUrl: './tosave-articlelist.component.html',
  styleUrls: ['./tosave-articlelist.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TosaveArticlelistComponent implements OnInit {
  form;
  systemlistproduct: any;
  SelectedItem: any = 'default';
  quantity = 1;
  ProductArray = [
  ];
  // @Input('rating') private listvar: number;
  @Output() private productListUpdated = new EventEmitter<any[]>();
  todoArray = [
    // { task : 'Meeting with Urban Team' , completed : false },
    // { task : 'Duplicate a project for new customer' , completed : false },
    // { task : 'Project meeting with CEO' , completed : false },
    // { task : 'Follow up of team zilla' , completed : false },
    // { task : 'Level up for Antony' , completed : false }
  ];

  constructor(fb: FormBuilder, private commonservice: CommonService, private productservice: DataManagementService) {
    this.form = fb.group({
      todoitem : ['', Validators.required]
    });
  }

  ngOnInit() {
   this. productList();
  }

  /** Display the list of all products of the system */
  productList() {
    this.productservice.get_allproducts()
    .subscribe((productlist) => {
      this.systemlistproduct = productlist.product;
      // console.log(`id juire >>>${this.systemlistproduct[0]['_id']}`);
  });
  }

  reset() {
    this.SelectedItem = '';
  }


  valuechange(value: any, column: any, i: any) {
    this.ProductArray[i][column] = value.target.value;
    // console.log(`value is: ${value}, mm ${event.target.value}, i>: ${i}`);
  }

  /** for testing purpose */
/*   checkValue() {
    this.ProductArray.forEach(element => {
      console.log(`${element['delivery_price']}, quty: ${element['quantity']}`);
    });
  }
 */
  selectProduct(event: any): void {
    // if (event.target.checked) { // use it in case of checkbox
      // if (event.target.value) {
      if (event === 'default') {
        console.log(`default value: ${event}`);
      } else {
        console.log(`value name>>: ${event['name']}, id>${event['_id']}, ${event}`);
        this.addPorduct(event);
      }
  }

  price(value: number): any {
    return this.commonservice.getformatCurrency(value);
  }

  getAmount(list: any): any {
   return this.commonservice.getformatCurrency(list['quantity'] * list['delivery_price']);
  }


  addPorduct(item: any) {
    let newProductList = { id: item['_id'], reference: item['reference'], unitproduct: item['unitproduct'] /* */, delivery_price: 0, name: item['name'], product: item['_id']/* , usercreate: '' */, quantity: 0 };
    this.ProductArray.push(newProductList);
    this.productListUpdated.emit(this.ProductArray);
    this.reset();
    // this.form.reset();
  }

  addTodo() {
    let newTodoList = { task: '' , completed: false };
    newTodoList.task = this.form.value.todoitem;
    this.todoArray.push(newTodoList);
    this.form.reset();
  }
  removeTodoItem(item) {
   for (let i = 0; i <= this.todoArray.length; i++) {
     if (item === this.todoArray[i]) {
       this.todoArray.splice(i, 1);
     }
   }
  }
  changeTodoStatus(event, index) {
    if (event.target.checked) {
    this.todoArray[index]['completed'] = true;
    } else {
      this.todoArray[index]['completed'] = false;
    }
  }

}
