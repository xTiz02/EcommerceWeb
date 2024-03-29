import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AdminService } from '../../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute,RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-view-promotions',
  standalone: true,
  imports:  [ CommonModule,MatButtonModule,MatCardModule,MatDividerModule,MatSlideToggleModule,RouterModule],
  templateUrl: './view-promotions.component.html',
  styleUrl: './view-promotions.component.scss'
})
export class ViewPromotionsComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private activatedRoute: ActivatedRoute,private router:Router){}

  productId:number = this.activatedRoute.snapshot.params['productId'];
  pageListProductsPromotions: any = [];//content

  
  ngOnInit(): void {
    console.log(this.productId)
    //this.getAllProducts();
    this.getPromotions(this.productId);
  }
  // changeStatusProduct(idUnit:number,event:any, ):void{
  // console.log(event.checked);
  // this.adminService.changeStatusProductUnit(this.productId,idUnit,event.checked).subscribe(
  //   (res: any) => {
  //     console.log(res);
  //     this.snackBar.open('Product unit status updated successfully', 'Close', {
  //       duration: 7000,
  //     });
  //   },
  //   (err: any) => {
  //     console.log(err);
  //     if(err.status==0){
  //       this.snackBar.open('Server not working...', 'Close', {
  //         duration: 7000,
  //       });
  //       return;
  //     }else{
  //       const error = err.error.corps;
  //       if(error){
  //         switch (error.type) {
  //         case 'DATA_EMPTY':
  //           this.snackBar.open(error.message, 'Close', {
  //             duration: 7000,
  //           });
  //           break;
  //         case 'DATA_INVALID':
  //           this.snackBar.open(error.message, 'Close', {
  //             duration: 7000,
  //           });
  //           break;
  //         case 'ERROR':
  //           this.snackBar.open(error.message, 'Close', {
  //             duration: 7000,
  //           });
  //           event.source.checked = !event.checked;
  //           break;
  //         default:
  //           this.snackBar.open('Error updating product unit status', 'Close', {
  //             duration: 7000,
  //           });
  //           break;
  //         }
  //       }else{
  //         this.snackBar.open('Inesperated error', 'Close', {
  //           duration: 7000,
  //         });
  //       }
        
  //     }
      
      
  //   }
  // );
  // }





  getPromotions(productId:number): void {
    this.adminService.getPromotionsByProductId(productId).subscribe(
      (res: any) => {
        console.log(res);
        this.pageListProductsPromotions = [];
        res.forEach((element: any) => {
          this.pageListProductsPromotions.push(element);
        });
        

      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          const corps = err.error.corps;
          if(corps){
            switch (corps.type) {
              case 'DATA_EMPTY':
                this.snackBar.open(corps.message, 'Close', {
                  duration: 7000,
                });
                break;
              case 'DATA_INVALID':
                this.snackBar.open(corps.message, 'Close', {
                  duration: 7000,
                });
                break;
              case 'ERROR':
                this.snackBar.open(corps.message, 'Close', {
                  duration: 7000,
                });
                break;
              default:
                this.snackBar.open('Error loading promotions', 'Close', {
                  duration: 7000,
                });
                break;
            }
            return;
          }
        }
        
        
      }
    );
  }


  deletePromotion(id: number): void {
    this.adminService.deletePromotion(id).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Promotion deleted successfully', 'Close', {
          duration: 7000,
        });
        this.getPromotions(this.productId);
      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          return;
        }else{
          const corps = err.error.corps;
          if(corps){
            
            switch (corps.type) {
              case 'DATA_EMPTY':
                this.snackBar.open(corps.message, 'Close', {
                  duration: 7000,
                });
                break;
              case 'DATA_INVALID':
                this.snackBar.open('corps.message', 'Close', {
                  duration: 7000,
                });
                break;
              case 'ERROR':
                this.snackBar.open('corps.message', 'Close', {
                  duration: 7000,
                });
                break;
              default:
                this.snackBar.open('Error deleting promotion', 'Close', {
                  duration: 7000,
                });
                break;
            }
            return;
          }
        }
      }
    );
  }
}
