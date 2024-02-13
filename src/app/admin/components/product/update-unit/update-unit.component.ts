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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-update-unit',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,MatSelectModule,MatDividerModule,MatPaginatorModule,MatRadioModule,MatCheckboxModule],
  templateUrl: './update-unit.component.html',
  styleUrl: './update-unit.component.scss'
})
export class UpdateUnitComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private activatedRoute: ActivatedRoute ){}
  unitId:number = this.activatedRoute.snapshot.params['unitId'];
  productId:number = this.activatedRoute.snapshot.params['productId'];
  validateForm!: FormGroup;
  selectedFiles? : File[] | null = [];
  imagesPreview?: string[] | ArrayBuffer[] | null= [];
  unit: any = {};
  imagesToDelete: any = [];

  
  get color() { return this.validateForm.controls['color']; }
  get stock() { return this.validateForm.controls['stock']; }
  get priceModifier() { return this.validateForm.controls['priceModifier']; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      color : [null, [Validators.required]],
      stock: [null, [Validators.required,Validators.min(1)]],
      priceModifier: [null, []],
    });
    this.getProductUnitById();
  }
  getProductUnitById(): void {
    this.adminService.getProductUnitById(this.productId,this.unitId).subscribe(
      (res: any) => {
        
        this.unit = res.corps.data;
        this.validateForm.setValue({
          color: this.unit.color,
          stock: this.unit.stock,
          priceModifier: this.unit.priceModifier
        });
        console.log(this.unit);
      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          this.snackBar.open('Error loading product unit', 'Close', {
            duration: 7000,
          });
        
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
  onFileSelected(event:any){
    
    this.imagesPreview = [];
    this.selectedFiles = [];
    //si no se escohge ninguna imagen
    if(event.target.files.length === 0){
      console.log("No se selecciono ninguna imagen");
      return;
    } 
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
    this.previewImage();
  } 
  previewImage(){
    for (let i = 0; i < this.selectedFiles!.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagesPreview?.push(e.target.result);
      };
      reader.readAsDataURL(this.selectedFiles![i]);
    }
  }

  toggleSelection(item:any){
    console.log(item);
    if(this.imagesToDelete.includes(item)){
      this.imagesToDelete = this.imagesToDelete.filter((image: any) => image !== item);
    }else{
      this.imagesToDelete.push(item);
    }
    console.log(this.imagesToDelete);
  }


  updateProductUnit(): void {
    if(this.validateForm.valid){
      console.log(this.validateForm.value);

      const formData: FormData = new FormData();
      formData.append('productId', this.productId.toString());
      formData.append('id', this.unitId.toString());
      formData.append('color', this.color.value);
      formData.append('priceModifier', this.priceModifier.value);
      formData.append('stock', this.stock.value);
      if(this.selectedFiles!.length > 0){
        for(let i = 0; i < this.selectedFiles!.length; i++) {
          formData.append('images', this.selectedFiles![i]);
        }
      }
      if(this.imagesToDelete.length > 0){
        for(let i = 0; i < this.imagesToDelete.length; i++) {
          formData.append('imagesReturn', this.imagesToDelete[i]);
        }
      }
      formData.forEach((value,key) => {
        console.log(key + ' ' + value);
      });

      this.adminService.updateProductUnit(this.productId,this.unitId,formData).subscribe(
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
