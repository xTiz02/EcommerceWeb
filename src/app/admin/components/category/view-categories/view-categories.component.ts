import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule,MatSelectModule,MatDividerModule,MatPaginatorModule,MatDialogModule,MatSlideToggleModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.scss'
})
export class ViewCategoriesComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder ){}
  //listAllProducts: any = [];
  
  searchForm!: FormGroup;

  pageListCategories: any = [];//content
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
  noCategories = false;
  pageEvent?: PageEvent;

  get title() { return this.searchForm.controls['title']; }

  ngOnInit(): void {
      console.log("init")
      //this.getAllProducts();
      this.getPageCategories(0, 8);
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
      this.getPageCategoriesByName(this.title.value, this.pageIndex, this.pageSize);
      return;
    }
    this.getPageCategories(this.pageIndex, this.pageSize);
  }

  changeTitleForm(event:any):void{
    if(event.target.value==''){
      this.getPageCategories(0,8);
    }
    this.noCategories = false;
  }
 

  getPageCategories(page: number, size: number): void {
    this.adminService.getPageCategories(page, size).subscribe(
      (res: any) => {
        console.log(res);
        this.length = res.totalElements;
        this.pageListCategories = [];
        res.content.forEach((element: any) => {
          this.pageListCategories.push(element);
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
          this.snackBar.open('No categories found', 'Close', {
            duration: 7000,
          });
        }else{
          this.snackBar.open('Error loading categories', 'Close', {
            duration: 7000,
          });
        }
        
      }
    );
  }


  getPageCategoriesByName(name: string, page: number, size: number): void {
    this.adminService.getPageCategoriesByName(page, size,name ).subscribe(
      (res: any) => {
        console.log(res);
        this.length = res.totalElements;
        this.pageSize = res.pageSize;
        this.pageIndex = res.pageNumber;
        this.pageListCategories = [];
        res.content.forEach((element: any) => {
          this.pageListCategories.push(element);
        });

      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          this.noCategories= true;
        }
        if(err.error.corps.type=='DATA_EMPTY'){
          this.snackBar.open('There are no categories with this name', 'Close', {
            duration: 7000,
          });
          this.noCategories= true;
        }else{
          this.snackBar.open('Error loading categories by name', 'Close', {
            duration: 7000,
          });
        }
        
      }
    );
  }

  submitForm(): void {
    console.log(this.searchForm.value);
    
    if(this.title.value!==null && this.title.value!==''){
      
      this.getPageCategoriesByName(this.title.value, 0,8);
      return;
    }
    this.getPageCategories(0,8);
  }
  goBack(): void {
    this.title.setValue('');
    this.submitForm();
    this.noCategories = false;
  }



  deleteCategory(id: number): void {
    this.adminService.deleteCategory(id).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Category deleted successfully', 'Close', {
          duration: 7000,
        });
        this.getPageCategories(0,8);
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
          this.snackBar.open('Error deleting categories', 'Close', {
          duration: 7000,
        });
        }
        
        
      }
    );
  }
}
