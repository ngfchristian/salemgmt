import { IUnit } from './unit.model';

export interface IProduct {
    // _id: string;
    id: string;
    name: string;
    unit: IUnit;
    categoryid: string;
    description: string;
    reference: string;
    price: number;
    sale_price: number;
    quantity: number;
    imgurl: string;
    // datecreate: Date;
    datecreate: string;
    datemodified: Date;
    usercreate: string; // [it should login, and here our login is the email]
    usermodified: string; // [it should login, and here our login is the email]
}
