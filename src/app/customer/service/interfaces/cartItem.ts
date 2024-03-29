export interface CartItem {
    id?: number;
    image: string;
    productId: number;
    productUnitId: number;
    name: string;
    discount?: number;
    discountPrice?: number;
    quantity: number;
    price: number;
    stock?:number;
    total?: number;
}