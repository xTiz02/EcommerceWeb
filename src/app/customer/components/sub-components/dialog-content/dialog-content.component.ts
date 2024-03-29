import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog,MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
//routerLinl
import { Router,RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CustomerServiceService } from '../../../service/customer-service.service';
import { ProductView } from '../../../service/interfaces/productView';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../../service/interfaces/cartItem';
import { CartStorageService } from '../../../service/cart/cart-storage-service.service';
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent {
  //obtener id del producto
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public customerService: CustomerServiceService, private snackBar: MatSnackBar,private dialog:MatDialog,private cartStorageService: CartStorageService){
  }
  //obtener id del producto del openDialog del componente padre
  product?: ProductView;
  characteristics: any = [];
  cartItem?: CartItem;
  principalUnit?:any;
  principalImage?: string;
  otherUnits: any = [];
 
  //uno o mas strings
  idProduct: number = this.data.id;
  ngOnInit(): void {
    this.getProductDetails();
  }


  getProductDetails(){
    this.customerService.loadProductWithDetailsStandardMethod(this.idProduct).subscribe(
      (res) => {
        console.log(res);
        this.product = res;
        this.principalUnit = this.product?.units![0];
        
        this.principalImage = this.product.imgUrl;
        this.otherUnits = this.product?.units!.slice(1);
        this.product.characteristics?.split('\n').map((item) => {
          let temp = item.split(':');
          
          this.characteristics?.push([temp[0],temp[1]]);
        });
        
        
      },
      (err) => {
        console.log(err);
        this.product = this.customerService.productMemory;
      }
    )
  }
  closeDialog(){
    this.dialog.closeAll();
  }

  addToCart(unitId:number){
    const unit = this.product?.units?.find((unit) => unit.id == unitId);
    this.cartItem = {
      image: this.principalImage!,
      productUnitId: unit?.id!,
      name: this.product?.name!,
      quantity: 1,
      productId: this.product?.id!,
      stock: unit?.stock!,
      price: this.product?.price!
    }

    if(this.product?.promotion){
      this.cartItem.discount = this.product?.promotion.discount;
      this.cartItem.discountPrice = Number((this.product?.price! - (this.product?.price! * this.cartItem.discount / 100)).toFixed(2));
    }
   this.cartStorageService.addCartItem(this.cartItem);
    
  }
  changeUnitPrincipal(unitId: number){
    this.principalUnit = this.product?.units?.find((unit) => unit.id == unitId);
    this.principalImage = this.principalUnit?.images[0];
    if(!this.principalUnit.color){
      this.principalImage = this.product?.imgUrl;
    }
  }
}
