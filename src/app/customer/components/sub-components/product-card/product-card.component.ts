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
    categoryName: ''
  };
  constructor(private dialog:MatDialog){}

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
