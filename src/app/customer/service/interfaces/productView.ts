export interface ProductView{
    id:number;
    name:string;
    price:number;
    imgUrl:string;
    categoryName:string;
    description?:string;
    stock?:number;
    discount?:number;
    specifications?:string;
    characteristics?:string;
}