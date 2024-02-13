
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//routerLink
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { ProductView } from '../../../service/interfaces/productView';
import {MatDialog, MatDialogModule,MatDialogConfig} from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'app-slider-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, MatCardModule, CarouselModule, MatDialogModule, RouterModule, ProductCardComponent],
  templateUrl: './slider-products.component.html',
  styleUrl: './slider-products.component.scss'
})
export class SliderProductsComponent {

  constructor(private dialog:MatDialog){}
  customOptions?: OwlOptions;
  @Input() productsSlider?: ProductView[];

  ngOnInit(): void {
    console.log(this.productsSlider);
    this.customOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  }
  ngOnChanges(): void {
    console.log(this.productsSlider);
  }

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
  
}

