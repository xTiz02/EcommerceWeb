import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cartItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
const CART = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {

  constructor(private snackBar: MatSnackBar) { }
  cantidadProductosEnCarrito$ = new BehaviorSubject<number>(0);

  //add item in list cart
   addCartItem(cart: CartItem): void {  
    const cartList:CartItem[] = this.getCart();
    const index = cartList.findIndex((item: CartItem) => item.productUnitId === cart.productUnitId);
    const item = cartList[index];
    if(item){
      item.quantity += cart.quantity;
      if(item.discount){
        item.total = Number((item.quantity * item.price).toFixed(2));
        item.total = Number((item.total - (item.total * item.discount / 100)).toFixed(2));
      }else{
        item.total =  Number((item.quantity * item.price).toFixed(2));
      }
    }
    else{
      if(cart.discount){
        cart.total = Number((cart.quantity * cart.price).toFixed(2));
        cart.total = Number((cart.total - (cart.total * cart.discount / 100)).toFixed(2));
      }else{
        cart.total =  Number((cart.quantity * cart.price).toFixed(2));
      }
      cartList.push(cart);
    }
    localStorage.removeItem(CART);
    localStorage.setItem(CART, JSON.stringify(cartList));
    this.updateNumberOfItems();
    this.snackBar.open('Product added to cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  //get list cart
   getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem(CART) || '[]');
  }


  //remove item in list cart
   removeToCart(unitId: number): void {
    const cartList:CartItem[] = this.getCart();
    const index = cartList.findIndex((item: CartItem) => item.productUnitId === unitId);
    cartList.splice(index, 1);
    localStorage.removeItem(CART);
    localStorage.setItem(CART, JSON.stringify(cartList));
    this.updateNumberOfItems();
    this.snackBar.open('Product removed from cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  reduceProductQuantity(unitId: number): void {
    const cartList:CartItem[] = this.getCart();
    const index = cartList.findIndex((item: CartItem) => item.productUnitId === unitId);
    const item = cartList[index];
    if(item.quantity > 1){
      item.quantity--;
      if(item.discount){
        item.total = Number((item.quantity * item.price).toFixed(2));
        item.total = Number((item.total - (item.total * item.discount / 100)).toFixed(2));
      }else{
        item.total =  Number((item.quantity * item.price).toFixed(2));
      }
    }
    localStorage.removeItem(CART);
    localStorage.setItem(CART, JSON.stringify(cartList));
    this.updateNumberOfItems();
  }
  //get number of items in cart
   updateNumberOfItems(): void {
    console.log(this.getCart().length);
    this.cantidadProductosEnCarrito$.next(this.getCart().length);
  }

  deleteCart(): void {
    localStorage.removeItem(CART);
    this.updateNumberOfItems();
  }
}
