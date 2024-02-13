import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule,RouterOutlet } from '@angular/router';
//form
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { CustomerServiceService } from '../../service/customer-service.service';
import { Category } from '../../service/interfaces/category';
import { ProductCardComponent } from '../sub-components/product-card/product-card.component';
import { ProductView } from '../../service/interfaces/productView';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ CommonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSliderModule, MatRadioModule, MatExpansionModule, MatListModule, MatButtonModule, RouterModule, RouterOutlet, MatFormFieldModule, MatCardModule, ReactiveFormsModule, ProductCardComponent, MatPaginatorModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  constructor(private router: Router, private fb: FormBuilder,private route:ActivatedRoute,private service:CustomerServiceService){
    
  }
  length = 0;//totalElements
  pageSize = 8;//pageSize
  pageIndex = 0;//pageNumber
  pageSizeOptions = [8, 16, 32];
  totalPages = 0;//totalPages
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  productListView?:ProductView[];
  panelOpenState = false;
  disabled = false;
  pageEvent?: PageEvent;
  max = 1000;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  listCategories?:Category[];
  listColors:any = [{id:1 , name: 'Blue'},{id:2 , name: 'Yellow'},{id:3 , name: 'Black'},{id:4 , name: 'Ligth'},{id:5 , name: 'Orange'},{id:6 , name: 'Red'},{id:7 , name: 'Green'}];
  selectCategories:number[] = [];
  selectColors:any = [];
  validationForm!: FormGroup;
  datoDelPadre: any;


  get mayorDe() { return this.validationForm.controls['mayorDe']; }
  get menorDe() { return this.validationForm.controls['menorDe']; }
  

  toggleSelection(item:any,type:string){
    if(type == 'category'){
      if(this.selectCategories.includes(item)){
        this.selectCategories = this.selectCategories.filter((element:any) => element !== item );
      }else{
        this.selectCategories.push(item);
      }
      console.log(this.selectCategories);
    }
    if(type == 'color'){
      if(this.selectColors.includes(item)){
        this.selectColors = this.selectColors.filter((element:any) => element !== item);
      }else{
        this.selectColors.push(item);
      }
      console.log(this.selectColors);
    }
  }
  ngOnInit(){
    this.validationForm = this.fb.group({
      mayorDe: [0, [Validators.required]],
      menorDe: [0, [Validators.required]],
    });
    this.loadCategories();
    this.productListView = this.service.productsMemory;
    //console.log(this.datoDelPadre);
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
  }
  submitFilter(){
    console.log(this.validationForm.value);
    console.log(this.selectCategories);
    console.log(this.selectColors);
  }

  loadCategories(){
    this.service.loadCategoriesStandardMethod().subscribe((res) => {
      this.listCategories = res;
    },(error) => {
      this.listCategories = this.service.categoriesMemory;
    });
  }
  
}
