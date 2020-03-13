import { IProduct } from './product.model';

export interface ISALE {
        _id: string;
        reference: string;
        usercreate: string; // login
        datesale: Date;
        productlist: Array<IProduct>;
        datecreate: Date;
        client: {
            cname: {
                fname: string;
                lname: string;
            }
            ctelephone: number;
            clocation: string;
        };
        discount: number;
        taxe: number;
}
