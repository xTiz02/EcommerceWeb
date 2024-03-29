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
  selector: 'app-post-promotion',
  standalone: true,
  imports: [  CommonModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './post-promotion.component.html',
  styleUrl: './post-promotion.component.scss'
})
export class PostPromotionComponent {
  constructor(private formBuilder: FormBuilder,private adminService:AdminService,private router:Router,private snackBar: MatSnackBar,private activatedRouter:ActivatedRoute) { }

  productId:any = this.activatedRouter.snapshot.params['productId'];
  validateForm!: FormGroup;
  get discount() { return this.validateForm.controls['discount']; }
  get startDate() { return this.validateForm.controls['startDate']; }
  get endDate() { return this.validateForm.controls['endDate']; }


  submitForm(): void {
    console.log(new Date().toISOString());
    if (this.validateForm.valid) {
      this.adminService.postPromotion(this.productId,this.validateForm.value).subscribe((res:any)=>{
        console.log(res);
        this.snackBar.open(res.corps.message, 'Close', {
          duration: 2000,
        });
        this.router.navigateByUrl('/admin/product/'+this.productId+'/promotion');
      },(err:any)=>{
        console.log(err);
        this.snackBar.open(err.error.message, 'Close', {
          duration: 2000,
        });
      })
    }
  }
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      discount: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
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
}
