import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartItem } from '../../service/interfaces/cartItem';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartStorageService } from '../../service/cart/cart-storage-service.service';
import { CustomerServiceService } from '../../service/customer-service.service';
import { StorageService } from '../../../service/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent {
  constructor(private cartService: CartStorageService, private service : CustomerServiceService,private snackBar: MatSnackBar,private router: Router) { }
  cartItemsCount:string = '1';
  cartItems:CartItem[] = [];
  subTotal:number = 0;
  total:number = 0;

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCart();
    this.cartItemsCount = this.cartItems.length.toString();
    this.calculateTotal();
  }

  calculateTotal() {
    this.subTotal = 0;
    this.cartItems.forEach(item => {
      this.subTotal += item.total!;
    });
    this.total = this.subTotal;
  }

  addToCart(item:CartItem) {
    item.quantity = 1;
    console.log('Adding to cart', item);
    this.cartService.addCartItem(item);
    this.loadCartItems();
  }
  removeToCart(unitId:number) {
    
    this.cartService.removeToCart(unitId);
    this.loadCartItems();
  }
  reduceToCart(unitId:number) {
    this.cartService.reduceProductQuantity(unitId);
    this.loadCartItems();
  }
  saveItems(){
    if(StorageService.isCustomerLoggedIn()){
      this.service.saveCartItems(this.cartItems).subscribe((data)=>{
        console.log(data);
        this.snackBar.open('Order saved successfully', 'Close', {
          duration: 5000
        });
        this.cartService.deleteCart();
        window.location.reload();
      },(error)=>{
        console.log(error);
        this.snackBar.open(error.error.corps.message, 'Close', {
          duration: 10000
        });
      });
    }else{
      this.snackBar.open('Please login to save cart items', 'Close', {
        duration: 5000
      });
    }
    
  }


  redirectToProduct(id:number,name:string){
    this.router.navigateByUrl('/customer/product/'+id+'/'+name);
  }
}
