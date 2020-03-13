import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SaleManagementService {

  constructor(private http: HttpClient) { }



  /** Save new delivery into the system */
  saveNewSale(data: any): Observable<any> {
    // console.log(`result-service sale!>>: ${data}`);
    return this.http.post<any>(`${environment.apiEndpoint}/sales/save`, data);
    // return this.http.post<any>(`${environment.apiEndpoint}/delivery/save`, data)
    // .pipe(map(data => {
    //   console.log(`result-service!>>: ${data}`);
    //     return data;
    // }));
  }

  /** Display sale list */
  saleList(): Observable<any> {
  return this.http.get<any>(`${environment.apiEndpoint}/sales`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}


/**get the sale by its id */
getsaledetail(id: any): Observable<any[]> { // you will add the type later
  // return this.http.get<IProduct[]>(`${this.productURL}?productId=${id}`);
  // console.log(`id >>> ${id}`);
  return this.http.get<any[]>(`${environment.apiEndpoint}/sales/${id}`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data['product'].name} description ${data['product'].description}`);
      return data['sale']; // no need to add [.json()], the object is already a json object
  }));
}

  /** Save new delivery into the system */
  saveNewProductPrice(data: any): Observable<any> {
    // console.log('service>>> length  ' + data.length );
    // data.forEach(element => {
    //   console.log(`elemt   ${element['product']},
    //   selling price> ${element['selling_price']}
    //   usercreate> ${element['usercreate']}`);
    // });
    return this.http.post<any>(`${environment.apiEndpoint}/sales/updateproductprice`, data)
    .pipe(map( result => {
      // console.log(`svce data value: ${data}`);
      return result; // no need to add [.json()], the object is already a json object
  }));
  }


}
