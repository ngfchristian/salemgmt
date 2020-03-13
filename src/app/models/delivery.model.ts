import { IProduct } from './product.model';

export interface IDELIVERY {
        id: string;
        reference: string;
        usercreate: string; // login
        datedelivery: Date;
        description: string;
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
        agent: {
            aname: {
                fname: string;
                lname: string;
            };
            atelephone: number;
        };
        datemodified: Date;
        usermodified: string; // login

}
