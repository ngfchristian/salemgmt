import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPagesService {

  constructor(private http: HttpClient) { }



  get_allusers(): Observable<any> {
        // console.log(`we're here >>>: ${environment.apiEndpoint}`);
        return this.http.get<any>(`${environment.apiEndpoint}/auth/users`)
        .pipe(map(data => {
            // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
            return data; // no need to add [.json()], the object is already a json object
        }));
}


registeruser(user: any): Observable<any> {
  // console.log(`we're here >>>: ${environment.apiEndpoint}`);
  return this.http.post<any>(`${environment.apiEndpoint}/auth/register`, user);
}

// getsaveNewDelivery(data: any): Observable<any> {
//   console.log(`result-service!>>: ${data}`);
//   return this.http.post<any>(`${environment.apiEndpoint}/delivery/save`, data);
// }
}
