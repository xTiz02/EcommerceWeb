import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { ICarouselItem } from '../../service/carousel/carousel-item';
import {MatIconModule} from '@angular/material/icon';
import { CarouselComponent } from '../sub-components/carousel/carousel.component';
import { SliderProductsComponent } from '../sub-components/slider-products/slider-products.component';
import { CustomerServiceService } from '../../service/customer-service.service';
import { Category } from '../../service/interfaces/category';
import { ProductView } from '../../service/interfaces/productView';

interface TabType {
  id:number;
  title:string;
  data?:ProductView[];
  icon:string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatIconModule, CommonModule,ReactiveFormsModule,FormsModule,CarouselComponent,SliderProductsComponent,MatTabsModule,MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private service:CustomerServiceService){}
  newProductsView?: ProductView[];
  popularProductsView?: ProductView[];
  promotionsProductsView?: ProductView[];
  listCategories?: Category[];
  tabTypes:TabType[] = [];
  ngOnInit(): void {
    this.loadCategories();
    this.loadNewProducts();
    this.loadPopularProducts();
    this.loadPromotionsProducts();
  }

  loadCategories(){
    this.service.loadCategoriesStandardMethod().subscribe((res:any)=>{
      this.listCategories = res;

    },(err:any)=>{
      this.listCategories = this.service.categoriesMemory;
    }
    );
  }
  loadNewProducts(){
    this.service.loadFirstProductsByDateStandardMethod(8).subscribe((res:any)=>{
      this.newProductsView = res;
      this.tabTypes?.push({id:1,title:'New Products',data:this.newProductsView,icon:'new_releases'});
    },(err:any)=>{
      this.tabTypes?.push({id:1,title:'New Products',data:this.service.productsMemory,icon:'new_releases'});
      this.newProductsView = this.service.productsMemory;
    }
    );
  }
  loadPopularProducts(){
    // this.service.loadPopularProductsStandardMethod(8).subscribe((res:any)=>{
    //   this.popularProductsView = res;
    //   this.tabTypes?.push({id:2,title:'Popular Products',data:this.popularProductsView,icon:'trending_up'});
    // },(err:any)=>{
    //   this.popularProductsView = this.service.productsMemory;
    // }
    // );
    this.tabTypes.push({id:2,title:'Popular Products',data:this.service.productsMemory,icon:'trending_up'});
  }
  loadPromotionsProducts(){
    this.service.loadPromotionsProductsStandardMethod(8).subscribe((res:any)=>{
      console.log(res);
      this.promotionsProductsView = res;
      this.tabTypes?.push({id:3,title:'Promotions',data:this.promotionsProductsView,icon:'local_offer'});
    },(err:any)=>{
      this.tabTypes?.push({id:3,title:'Promotions',data:this.service.productsMemory,icon:'local_offer'});
      this.promotionsProductsView = this.service.productsMemory;
    }
    );
  }



}
