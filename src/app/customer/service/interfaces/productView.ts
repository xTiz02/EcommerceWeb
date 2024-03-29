export interface ProductView{
    id:number;
    name:string;
    price:number;
    imgUrl:string;
    categoryName:string;
    description?:string;
    discount?:number;
    stardDate?:Date;
    endDate?:Date;
    specifications?:string;
    characteristics?:string;
    promotion?:{
        id:number;
        discount:number;
        startDate:Date;
        endDate:Date;
        
    }
    //lista de unidades
    units:{
        id:number;
        color:string;
        priceModifier:number;
        stock:number;
        images:String[];
    }[]

    //definir metodo para obtener el precio con descuento
}