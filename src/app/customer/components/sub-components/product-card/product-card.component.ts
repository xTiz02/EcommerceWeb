import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//routerLink
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ProductView } from '../../../service/interfaces/productView';
import {MatDialog, MatDialogModule,MatDialogConfig} from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { CartStorageService } from '../../../service/cart/cart-storage-service.service';
import { CartItem } from '../../../service/interfaces/cartItem';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatTabsModule, MatCardModule, MatDialogModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product: ProductView = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: '',
    categoryName: '',
    units: []
  };
  cartItem?: CartItem;

  constructor(private dialog:MatDialog ,private cartStorage: CartStorageService){}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:number) {
    //enviar id para cargar el producto
    
    this.dialog.open(DialogContentComponent, {
      maxWidth: '80vw',
      panelClass: 'product-dialog',
      enterAnimationDuration: enterAnimationDuration,
      exitAnimationDuration: exitAnimationDuration,
      data: {id:id}
    } );
    console.log(id);
  }


  addToCart(unit: number) {
    this.cartItem = {
      image: this.product.imgUrl!,
      productUnitId: unit,
      name: this.product?.name!,
      quantity: 1,
      productId: this.product?.id!,
      stock: this.product?.units?.find(u => u.id === unit)?.stock!,
      price: this.product?.price!
    }

    if(this.product?.promotion){
      this.cartItem.discount = this.product?.promotion.discount;
      this.cartItem.discountPrice = Number((this.product?.price! - (this.product?.price! * this.cartItem.discount / 100)).toFixed(2));
    }
   this.cartStorage.addCartItem(this.cartItem);
    
  }
}

// active = routerLinkActive  = "active"
//inactive = routerLinkActive = "inactive"
