import { Injectable } from '@angular/core';
import { formatCurrency, formatDate, getCurrencySymbol, getLocaleCurrencyName, getLocaleCurrencySymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }


 /**format the currency of any value */
  getformatCurrency(value: number/* , local: string, currency: string, currencycode: string */): any {
    return formatCurrency(value, 'en-US', 'GH₵', 'GHS');
  }

//   export declare function getCurrencySymbol(code: string, format: 'wide' | 'narrow', locale?: string): string;
   /**format the currency of any value */
   getCurrencySymbolof(): any {
    // return formatCurrency(value, 'en-US', 'GH₵', 'GHS');
    return getCurrencySymbol('GHS', 'narrow', 'en-US');
  }
  getLocaleCurrencySymbolof(): any {
    return getLocaleCurrencySymbol('en-US');
  }

  getLocaleCurrencyNamef(): any {
    // return formatCurrency(value, 'en-US', 'GH₵', 'GHS');
    return getLocaleCurrencyName('en-US');
  }


/* ########### Date ####### */

  parseDate(dateString: string): Date {
    // if (dateString) {
    //   return new Date(dateString);
    // }
    return dateString ? new Date(dateString) : null;
  }

   /**format the date of any value entered
    * value,'format','locale','timezone'
   */
   getformatDate(value: string): any {
    return formatDate(value, 'YYYY-MM-DDThh:mm:ss.sTZD', 'en-US', 'UTC');
  }
/** #### End Date ##### */


/* ########### Product  start ####### */

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
    return this.http.post<any>(`${environment.apiEndpoint}/product/updateone/productsave`, data)
    .pipe(map( data => {
        // console.log(`svce data value: ${data}`);
        return data; // no need to add [.json()], the object is already a json object
    }));
}
/** #### End product ##### */



/* ########### Unit ####### */

/** get list of all products of the system*/
get_allunits(/* idcat: any */): Observable<any> {
  return this.http.get<any>(`${environment.apiEndpoint}/units`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}

get_unitbyid(idcat: any): Observable<any> {
  return this.http.get<any>(`${environment.apiEndpoint}/units/${idcat}`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}

/** Save new unit into the system */
SaveNewUnit(data): Observable<any> {
  return this.http.post<any>(`${environment.apiEndpoint}/units/save`, data)
  .pipe(map( data => {
      // console.log(`svce data value: ${data}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}

EditUnit(idunit: any, data): Observable<any> {
  return this.http.put<any>(`${environment.apiEndpoint}/units/${idunit}`, data)
  .pipe(map(data => {
      // console.log(`svce data value: ${data}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}
/** #### End unit ##### */



/* ########### User  start ####### */
get_users_by_Id(id: any): Observable<any> {
  // console.log(`we're here >>>: ${environment.apiEndpoint}`);
  return this.http.get<any>(`${environment.apiEndpoint}/auth/users/${id}`)
  .pipe(map(data => {
      // console.log(`svce data value service_get_allproducts>>>:  ${data.product.length}`);
      return data; // no need to add [.json()], the object is already a json object
  }));
}
/* ########### User  End ####### */
}
