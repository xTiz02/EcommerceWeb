import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceService } from '../../../service/customer-service.service';
//import to NgModel
import {FormsModule} from '@angular/forms';

import { Category } from '../../../service/interfaces/category';
import { ProductCardComponent } from '../../sub-components/product-card/product-card.component';
import { ProductView } from '../../../service/interfaces/productView';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface Filter {
  title?: string;
  index: number;
  size: number;
}
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ MatPaginatorModule, CommonModule , MatFormFieldModule, MatIconModule, MatInputModule, ProductCardComponent, MatButtonModule, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  pageSize = 2;//pageSize
  totalPages = 0;//totalPages
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  @Input() productPageView?:ProductView[];
  @Input() length?:number;
  @Input() pageIndex?:number = 0;
  @Output() filterData = new EventEmitter<Filter>();
  // filter?: Filter;
  panelOpenState = false;
  title?: string;
  disabled = false;
  pageEvent?: PageEvent;

  ngOnInit(): void {
    // console.log(this.productPageView);
    // console.log(this.length);
  }
  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // if(this.title.value){
    //   this.getPageProductsByName(this.title.value, this.pageIndex, this.pageSize);
    //   return;
    // }
    // this.getPageProducts(this.pageIndex, this.pageSize);
    if(this.title){
      this.filterData.emit({title: this.title, index: this.pageIndex, size: this.pageSize});
    }else{
      this.filterData.emit({index: this.pageIndex, size: this.pageSize});
    }
    console.log(this.title)
  }

  filterByTitle(){
    this.filterData.emit({title: this.title, index: 0, size: 1});
    console.log(this.title)
  }
}
