import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
//import { Router,ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router, RouterModule ,ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-update-promotion',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,RouterModule,MatDatepickerModule],
  templateUrl: './update-promotion.component.html',
  styleUrl: './update-promotion.component.scss'
})
export class UpdatePromotionComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private activatedRoute: ActivatedRoute ){}

  productId:number = this.activatedRoute.snapshot.params['productId'];
  promotionId:number = this.activatedRoute.snapshot.params['promotionId'];
  promotion: any = {};
  validateForm!: FormGroup;

  
  get discount() { return this.validateForm.controls['discount']; }
  get startDate() { return this.validateForm.controls['startDate']; }
  get endDate() { return this.validateForm.controls['endDate']; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
     discount: [null, [Validators.required,Validators.min(1)]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
    this.getPromotionById();
  }
  getPromotionById(): void {
    this.adminService.getPromotionById(this.promotionId).subscribe(
      (res: any) => {
        
        this.promotion = res.corps.data;
        this.validateForm.setValue({
          discount: this.promotion.discount,
          startDate: this.promotion.startDate,
          endDate: this.promotion.endDate
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
            switch(corps.type){
              case 'DATA_EMPTY':
                this.snackBar.open('Promotion empty', 'Close', {
                  duration: 7000,
                });
                break;
              default:
                this.snackBar.open('Error getting promotion', 'Close', {
                  duration: 7000,
                });
                break;
            }
          }
        }
      }
    );
  }
  checkForErrorsIn(formControl: AbstractControl, field:string): string {
    
    if (formControl.hasError('required')) {
      return `This ${field} is required`;
    }
    if (formControl.hasError('minlength')) {
      return `This ${field} must have at least ${formControl.errors?.['minlength'].requiredLength} characters`;
    }
    if (formControl.hasError('maxlength')) {
      return `This ${field} must have less than ${formControl.errors?.['maxlength'].requiredLength} characters`;
    }
    if (formControl.hasError('min')) {
      return `This ${field} must be greater than ${formControl.errors?.['min'].min}`;
    }


    return '';
  }
  

  updatePromotion(): void {
    if(this.validateForm.valid){
      console.log(this.validateForm.value);

      this.validateForm.value.id = this.promotionId;
      this.validateForm.value.productId = this.productId;
      this.adminService.updatePromotion(this.validateForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 7000,
          });
        },
        (error: any) => {
          this.snackBar.open('Error updating product', 'Close', {
            duration: 7000,
          });
          console.log(error);
        }
      );
    
    }
  }
}
