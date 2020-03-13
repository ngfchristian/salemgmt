import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(private http: HttpClient) { }

  getproductdetail(id: any/* this type is optional */): Observable<IProduct[]> {
    // return this.http.get<IProduct[]>(`${this.productURL}?productId=${id}`);
    // console.log(`id >>> ${id}`);
    return this.http.get<IProduct[]>(`${environment.apiEndpoint}/product/${id}`)
    .pipe(map(data => {
        // console.log(`svce data value service_get_allproducts>>>:  ${data['product'].name} description ${data['product'].description}`);
        return data['carpentproduct']; // no need to add [.json()], the object is already a json object
    }));
}

getanurlproduct(url: any): Observable<any> {
    // return this.http.get<any>(this.img_name);
//    console.log(`url angula ssssxxx  + ${environment.apiEndpoint}`);
    return this.http.get<any>(`${environment.apiEndpoint}/${url}`)
    .pipe(map(data => {
        // console.log(`svce data value: ${data.url}`);
        return data.url; // no need to add [.json()], the object is already a json object
    }));
}

/** get list of all products of the system*/
get_allproducts(/* idcat: any */): Observable<any> {
        return this.http.get<any>(`${environment.apiEndpoint}/product`)
        .pipe(map(data => {
            // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
            return data; // no need to add [.json()], the object is already a json object
        }));
}

EditProduct(idproduct: any, data): Observable<any> {
    return this.http.put<any>(`${environment.apiEndpoint}/product/updateone/${idproduct}`, data)
    .pipe(map(data => {
        // console.log(`svce data value: ${data}`);
        return data; // no need to add [.json()], the object is already a json object
    }));
}


/** Save new product into the system */
SaveNewProduct(data): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/product/productsave`, data)
    .pipe(map( data => {
        // console.log(`svce data value: ${data}`);
        return data; // no need to add [.json()], the object is already a json object
    }));
}

deleteproduct(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/product/${id}`)
    .pipe(map(data => {
        // console.log(`svce data value: ${data.url}`);
        return data; // no need to add [.json()], the object is already a json object
    }));
}

}
