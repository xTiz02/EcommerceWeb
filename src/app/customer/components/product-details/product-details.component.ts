import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//angular material icon 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

}
