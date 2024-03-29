

import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {FormControl,ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CustomerServiceService } from './service/customer-service.service';
import { Category } from './service/interfaces/category';
import {MatBadgeModule} from '@angular/material/badge';
import { CartStorageService } from './service/cart/cart-storage-service.service';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule , MatSidenavModule, MatIconModule, MatMenuModule, ReactiveFormsModule, MatDividerModule,MatExpansionModule,MatListModule,MatFormFieldModule,MatInputModule,MatSidenavModule,MatIconModule,MatMenuModule,ReactiveFormsModule,MatBadgeModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  title = 'EcommerceWeb3';

  constructor(private router: Router,private categoryService: CustomerServiceService, private cartStorageService: CartStorageService) {
    
  }
  mode = new FormControl('over' as MatDrawerMode);
  hasBackdrop = new FormControl(null as null | boolean);
  position = new FormControl('start' as 'start' | 'end');
  panelOpenState = false;
  listCategories?:Category[];
  cartItemsCount?: string;
  isCustomer = false;
  ngOnInit(){
    console.log('CustomerComponent');
    this.loadCategories();
    this.cartStorageService.cantidadProductosEnCarrito$.subscribe(cantidad => {
      this.cartItemsCount = cantidad.toString();
      console.log(this.cartItemsCount); 
    });
    this.cartStorageService.updateNumberOfItems();
    this.isCustomer = StorageService.isCustomerLoggedIn();
  }
  loadCategories(){
    this.categoryService.loadSimpleCategoriesStandardMethod().subscribe((res:any) => {
      console.log(res);
      this.listCategories = res;
    },(err:any) => {
      this.listCategories = this.categoryService.categoriesMemory;
    });
    
  }

  
  
}
