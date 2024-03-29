import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//angular material icon 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerServiceService } from '../../service/customer-service.service';
import { ProductView } from '../../service/interfaces/productView';
import { ActivatedRoute, Route } from '@angular/router';
import{CartItem} from '../../service/interfaces/cartItem';
import { CartStorageService } from '../../service/cart/cart-storage-service.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  //obtener id del producto
  constructor(private customerService: CustomerServiceService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private cartStorageService: CartStorageService){
  }
  //obtener id del producto del openDialog del componente padre
  product?: ProductView;
  characteristics: any = [];
  specifications: any = [];
  description: string[] = [];
  images: string[] = [];
  principalUnit?:any;
  principalImage?: string;
  otherUnits: any = [];
  cartItem?: CartItem;
 
  idProduct: number = this.activatedRoute.snapshot.params['id'];
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
        console.log(this.product);
        this.product.characteristics?.split('\n').map((item) => {
          let temp = item.split(':');
         
          this.characteristics?.push([temp[0],temp[1]]);
        });
        this.product.specifications?.split('\n').map((item) => {
          let temp = item.split(':');
         
          this.specifications?.push([temp[0],temp[1]]);
        });
        this.product.description?.split('\n').map((item) => {
          
          this.description?.push(item);
        });
        //this.product?.units[0].images?.split('\n').map((item) => {
      },
      (err) => {
        console.log(err);
        this.product = this.customerService.productMemory;
      }
    )
  }
  changeUnitPrincipal(unitId: number){
    this.principalUnit = this.product?.units?.find((unit) => unit.id == unitId);
    this.principalImage = this.principalUnit?.images[0];
    if(!this.principalUnit.color){
      this.principalImage = this.product?.imgUrl;
    }
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
}
