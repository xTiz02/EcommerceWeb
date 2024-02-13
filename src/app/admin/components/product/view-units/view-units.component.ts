import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
//import { Router,ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-view-units',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule,MatSelectModule,MatDividerModule,MatPaginatorModule,MatSlideToggleModule],
  templateUrl: './view-units.component.html',
  styleUrl: './view-units.component.scss'
})
export class ViewUnitsComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private activatedRoute: ActivatedRoute ){}
  //listAllProducts: any = [];
  
  searchForm!: FormGroup;
  productId:number = this.activatedRoute.snapshot.params['productId'];
  pageListProductsUnits: any = [];//content
  
  

  ngOnInit(): void {
      console.log(this.productId)
      //this.getAllProducts();
      this.getProductsUnits(this.productId);
  }
  changeStatusProduct(idUnit:number,event:any, ):void{
    console.log(event.checked);
    this.adminService.changeStatusProductUnit(this.productId,idUnit,event.checked).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Product unit status updated successfully', 'Close', {
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
        }else{
          const error = err.error.corps;
          if(error){
            switch (error.type) {
            case 'DATA_EMPTY':
              this.snackBar.open(error.message, 'Close', {
                duration: 7000,
              });
              break;
            case 'DATA_INVALID':
              this.snackBar.open(error.message, 'Close', {
                duration: 7000,
              });
              break;
            case 'ERROR':
              this.snackBar.open(error.message, 'Close', {
                duration: 7000,
              });
              event.source.checked = !event.checked;
              break;
            default:
              this.snackBar.open('Error updating product unit status', 'Close', {
                duration: 7000,
              });
              break;
            }
          }else{
            this.snackBar.open('Inesperated error', 'Close', {
              duration: 7000,
            });
          }
          
        }
        
        
      }
    );
  }

  
  
 

  getProductsUnits(productId:number): void {
    this.adminService.getProductsUnitsByProductId(productId).subscribe(
      (res: any) => {
        console.log(res);
        this.pageListProductsUnits = [];
        res.forEach((element: any) => {
          this.pageListProductsUnits.push(element);
        });
        

      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          if(err.error.corps.type=='DATA_EMPTY'){
            this.snackBar.open('Product not exist', 'Close', {
              duration: 7000,
            });
            
          }else{
            this.snackBar.open('Error', 'Close', {
              duration: 7000,
            });
          }
        }
        
        
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
