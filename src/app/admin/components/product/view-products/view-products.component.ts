import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup,FormsModule } from '@angular/forms';
//import { Router,ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';




@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule,MatSelectModule,MatDividerModule,MatPaginatorModule,FormsModule,MatSlideToggleModule,MatDialogModule,MatMenuModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private router:Router ){}
  //listAllProducts: any = [];

 
  searchForm!: FormGroup;

  pageListProducts: any = [];//content
  length = 0;//totalElements
  pageSize = 8;//pageSize
  pageIndex = 0;//pageNumber
  pageSizeOptions = [8, 16, 32];
  totalPages = 0;//totalPages
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  isFirtsPage = false;//first
  isLastPage = false;//last
  noProducts = false;
  pageEvent?: PageEvent;

  get title() { return this.searchForm.controls['title']; }

  ngOnInit(): void {
      console.log("init")
      //this.getAllProducts();
      this.getPageProducts(0, 8);
      this.searchForm = this.fb.group({
        title: [null, []]
      });
  }


  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if(this.title.value){
      this.getPageProductsByName(this.title.value, this.pageIndex, this.pageSize);
      return;
    }
    this.getPageProducts(this.pageIndex, this.pageSize);
  }

  changeTitleForm(event:any):void{
    if(event.target.value==''){
      this.getPageProducts(0,8);
    }
    this.noProducts = false;
  }
  
  changeStatusProduct(id:number,event:any, ):void{
    console.log(id);
    console.log(event.checked);
    this.adminService.changeStatusProduct(id,event.checked).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Status changed successfully', 'Close', {
          duration: 7000,
        });
      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          return;
        }
        if(err.error.corps.type=='DATA_EMPTY'){
          this.snackBar.open(err.error.corps.message, 'Close', {
            duration: 7000,
          });
          return;
        }else{
          this.snackBar.open('Error changing status', 'Close', {
          duration: 7000,
        });
        }
      }
    );
  }
 

  getPageProducts(page: number, size: number): void {
    this.adminService.getAdminPageProducts(page, size).subscribe(
      (res: any) => {
        console.log(res);
        this.length = res.totalElements;
        this.pageListProducts = [];
        res.content.forEach((element: any) => {
          this.pageListProducts.push(element);
        });
        

      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }
        if(err.error.corps.type=='DATA_EMPTY'){
          this.snackBar.open('No products found', 'Close', {
            duration: 7000,
          });
        }else{
          this.snackBar.open('Error loading products', 'Close', {
            duration: 7000,
          });
        }
        
      }
    );
  }
  goBack(): void {
    this.title.setValue('');
    this.submitForm();
    this.noProducts = false;
  }

  getPageProductsByName(name: string, page: number, size: number): void {
    this.adminService.getAdminPageProductsByName(name, page, size).subscribe(
      (res: any) => {
        console.log(res);
        this.length = res.totalElements;
        this.pageSize = res.pageSize;
        this.pageIndex = res.pageNumber;
        this.pageListProducts = [];
        res.content.forEach((element: any) => {
          this.pageListProducts.push(element);
        });

      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          this.noProducts= true;
        }
        if(err.error.corps.type=='DATA_EMPTY'){
          this.snackBar.open('No products by name found', 'Close', {
            duration: 7000,
          });
          this.noProducts= true;
        }else{
          this.snackBar.open('Error loading products by name', 'Close', {
            duration: 7000,
          });
        }
        
      }
    );
  }

  submitForm(): void {
    console.log(this.searchForm.value);
    if(this.title.value!==null && this.title.value!==''){
      
      this.getPageProductsByName(this.title.value, 0,8);
      return;
    }
    this.getPageProducts(0,8);
  }


  redirectToUnits(productId:number): void {
    this.adminService.countProductUnits(productId).subscribe(
      (res: any) => {
        console.log(res);
        if(res>1){
          this.router.navigateByUrl('/admin/product/'+ productId+ '/units');
        }else{
          this.router.navigateByUrl('/admin/product/'+ productId+ '/unit');
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  redirectToPromotions(productId:number): void {
    this.adminService.countPromotionsByProductId(productId).subscribe(
      (res: any) => {
        console.log(res);
        if(res>0){
          this.router.navigateByUrl('/admin/product/'+ productId+ '/promotions');
        }else{
          this.router.navigateByUrl('/admin/product/'+ productId+ '/promotion');
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteProduct(id: number): void {
    this.adminService.deleteProduct(id).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 7000,
        });
        this.getPageProducts(0,8);
      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          return;
        }
        if(err.error.corps.type=='DATA_EMPTY'){
          this.snackBar.open(err.error.corps.message, 'Close', {
            duration: 7000,
          });
          return;
        }else{
          this.snackBar.open('Error deleting product', 'Close', {
          duration: 7000,
        });
        }
        
        
      }
    );
  }
}
