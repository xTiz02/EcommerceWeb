import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule,RouterOutlet } from '@angular/router';
//form
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
// import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatCardModule} from '@angular/material/card';
import { CustomerServiceService } from '../../service/customer-service.service';
import { Category } from '../../service/interfaces/category';
import { ProductCardComponent } from '../sub-components/product-card/product-card.component';
import { ProductView } from '../../service/interfaces/productView';
// import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filter, ProductPageComponent } from '../sub-components/product-page/product-page.component';
@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ CommonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSliderModule, MatExpansionModule, MatListModule, MatButtonModule, RouterModule, RouterOutlet, MatFormFieldModule, ReactiveFormsModule, ProductCardComponent, ProductPageComponent],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  constructor(private router: Router, private fb: FormBuilder,private route:ActivatedRoute,private service:CustomerServiceService,private snackBar: MatSnackBar){
    
  }
  lengthProducts?:number;//totalElements
  // pageSize = 16;//pageSize
  // pageIndex = 0;//pageNumber
  // totalPages = 0;//totalPages
  // hidePageSize = false;
  // showPageSizeOptions = true;
  // showFirstLastButtons = true;
  productListView?:ProductView[];
  panelOpenState = false;
  disabled = false;
  // pageEvent?: PageEvent;
  pageIndex?:number = 0;
  max = 1000;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  listCategories?:Category[];
  listColors:any = [{id:1 , name: 'Blue'},{id:2 , name: 'Yellow'},{id:3 , name: 'Black'},{id:4 , name: 'Ligth'},{id:5 , name: 'Orange'},{id:6 , name: 'Red'},{id:7 , name: 'Green'}];
  selectCategories?:number[]
  selectColors?:any
  validationForm!: FormGroup;
  //datoDelPadre: any;
  filterPageData?:Filter;
  filterData:any;


  get mayorDe() { return this.validationForm.controls['mayorDe']; }
  get menorDe() { return this.validationForm.controls['menorDe']; }
  

  toggleSelection(item:any,type:string){
    if(type == 'category'){
      if(!this.selectCategories){
        this.selectCategories = [];
      }
      if(this.selectCategories!.includes(item)){
        this.selectCategories = this.selectCategories!.filter((element:any) => element !== item );
        if(this.selectCategories.length == 0){
          this.selectCategories = undefined;
        }
      }else{
        this.selectCategories!.push(item);
      }
    }
    if(type == 'color'){
      if(!this.selectColors){
        this.selectColors = [];
      }
      if(this.selectColors.includes(item)){
        this.selectColors = this.selectColors.filter((element:any) => element !== item );
        if(this.selectColors.length == 0){
          this.selectColors = undefined;
        }
      }else{
        this.selectColors.push(item);
      }
    }
  }
  ngOnInit(){
    this.validationForm = this.fb.group({
      mayorDe: [null, []],
      menorDe: [null, []],
      colors: [null, []],
    });
    this.loadCategories();
    //iniciar los productos
    this.getProductsPage({index:0,size:2});
    //console.log(this.datoDelPadre);
  }
  getProductsPage(filterPageData:Filter){
    this.service.getPageProductsList(filterPageData).subscribe((res) => {
      console.log(res);
      this.productListView = res.corps.data.content;
      this.lengthProducts = res.corps.data.totalElements;
    },(error) => {
      console.log(error);
      this.productListView = this.service.productsMemory;
      this.lengthProducts = this.service.productsMemory.length;
    });
  }
  
  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  //   // if(this.title.value){
  //   //   this.getPageProductsByName(this.title.value, this.pageIndex, this.pageSize);
  //   //   return;
  //   // }
  //   // this.getPageProducts(this.pageIndex, this.pageSize);
  // }

  handleFilterPageData(e:Filter){//recibe los datos de la paginacion y title
    this.filterPageData = e;
    console.log(this.filterPageData);
    //cambiar la page de productos
    //pregunta si hay filtros
    // console.log(this.filterPageData);
    if(this.filterData){
      this.filterData.index = this.filterPageData.index;
      this.filterData.size = this.filterPageData.size;
      if(this.filterPageData.title){
        this.filterData.title = this.filterPageData.title;
      }else{
        delete this.filterData.title;
      }
      this.getFilteredProducts(this.filterData);
    }else{
      this.getProductsPage(this.filterPageData);
    }
    
  }


  submitFilter(){
    this.filterData = {
      index: 0,
      size: 2,
    }
    if(this.selectCategories){
      this.filterData.categoriesIds = this.selectCategories;
    }
    if(this.selectColors){
      this.filterData.colors = this.selectColors;
    }
    if(this.mayorDe.value){
      this.filterData.mayorDe = this.mayorDe.value;
    }
    if(this.menorDe.value){
      this.filterData.menorDe = this.menorDe.value;
    }
    if(this.filterPageData?.title){
      this.filterData.title = this.filterPageData.title;
    }
    console.log(this.validationForm.value);
    this.getFilteredProducts(this.filterData);
  }
  getFilteredProducts(filterData:any){
    this.service.getPageFilteredProductsList(filterData).subscribe((res) => {
      console.log(res);
      this.lengthProducts = res.corps.data.totalElements;
      this.productListView = res.corps.data.content;
      this.pageIndex = res.corps.data.pageNumber;
      console.log(this.pageIndex);
      // this.isLastPage = res.corps.last;
      // this.noProducts = false;
    } ,(error) => {
      console.log(error);
      if(error.status==0){
        this.snackBar.open('Server not working...', 'Close', {
          duration: 7000,
        });
      }else{
        //this.noProducts = true;
      }
    });
  }
  cleanFilter(){
    window.location.reload();
  }


  loadCategories(){
    this.service.loadCategoriesStandardMethod().subscribe((res) => {
      this.listCategories = res;
    },(error) => {
      this.listCategories = this.service.categoriesMemory;
    });
  }
  
}
