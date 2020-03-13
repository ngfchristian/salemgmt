import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { IDELIVERY } from '../models/delivery.model';


@Injectable({
  providedIn: 'root'
})
export class DeliveryserviceService {

  constructor(private http: HttpClient) { }


  get_alldeliveries(): Observable<any> {
    return this.http.get<any>(`${environment.apiEndpoint}/delivery`)
    .pipe(map(data => {
        // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
        return data; // no need to add [.json()], the object is already a json object
    }));
  }

   /** Save new delivery into the system */
  getsaveNewDelivery(data: any): Observable<any> {
    console.log(`result-service!>>: ${data}`);
    return this.http.post<any>(`${environment.apiEndpoint}/delivery/save`, data);
    // return this.http.post<any>(`${environment.apiEndpoint}/delivery/save`, data)
    // .pipe(map(data => {
    //   console.log(`result-service!>>: ${data}`);
    //     return data;
    // }));
  }




getdeliverydetail(id: any/* this type is optional */): Observable<IDELIVERY[]> {
  // return this.http.get<IProduct[]>(`${this.productURL}?productId=${id}`);
  // console.log(`id >>> ${id}`);
  return this.http.get<IDELIVERY[]>(`${environment.apiEndpoint}/delivery/${id}`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data['product'].name} description ${data['product'].description}`);
      return data['deliverydetail']; // no need to add [.json()], the object is already a json object
  }));
}

}
