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
  selector: 'app-update-product',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,MatSelectModule,MatDividerModule,MatPaginatorModule,MatRadioModule,RouterModule,MatCheckboxModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder,private activatedRoute: ActivatedRoute ){}
  productId:number = this.activatedRoute.snapshot.params['productId'];
  validateForm!: FormGroup;
  selectedFiles? : File[] | null = [];
  imagesPreview?: string[] | ArrayBuffer[] | null= [];
  listCategories: any = [];
  product: any = {};
  imagesToDelete: any = [];
  get name() { return this.validateForm.controls['name']; }
  get description() { return this.validateForm.controls['description']; }
  get price() { return this.validateForm.controls['price']; }
  get categoryId() { return this.validateForm.controls['categoryId']; }
  get characteristics() { return this.validateForm.controls['characteristics']; }
  get specifications() { return this.validateForm.controls['specifications']; }
  get principalImage() { return this.validateForm.controls['principalImage']; }
  // get color() { return this.validateForm.controls['color']; }
  get stock() { return this.validateForm.controls['stock']; }
  // get priceModifier() { return this.validateForm.controls['priceModifier']; }

  ngOnInit(): void {
    this.getAllCategories();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(40)]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required,Validators.min(1)]],
      characteristics: [null, [Validators.required]],
      specifications: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      principalImage: [null, [Validators.required]],
      // color : [null, []],
      stock: [null, [Validators.required,Validators.min(1)]],
      // priceModifier: [null, []],
    });
    this.getProductById();
  }
  getProductById(): void {
    this.adminService.getProductById(this.productId).subscribe(
      (res: any) => {
        
        this.product = res.corps.data;
        this.name?.setValue(this.product.name);
        this.description?.setValue(this.product.description);
        this.price?.setValue(this.product.price);
        this.characteristics?.setValue(this.product.characteristics);
        this.specifications?.setValue(this.product.specifications);
        this.categoryId?.setValue(this.product.categoryId);
        this.principalImage?.setValue(this.product.principalUrl);
        this.stock?.setValue(this.product.stock);
        console.log(this.product);
      },
      (err: any) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          this.snackBar.open('Error loading product', 'Close', {
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
      this.principalImage?.setValue(this.product.principalUrl);
      console.log(this.selectedFiles);
      return;
    } 
    //agregar (principal) en al nombre de la primera imagen
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
    //this.principalImage?.setValue(this.selectedFiles![0].name);
    
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
  addProduct(): void {
    if(this.validateForm.valid){
      console.log(this.validateForm.value);

      const formData: FormData = new FormData();
      formData.append('id', this.productId.toString());
      formData.append('name', this.name.value);
      formData.append('description', this.description.value);
      formData.append('price', this.price.value);
      formData.append('categoryId', this.categoryId.value);
      formData.append('characteristics', this.characteristics.value);
      formData.append('specifications', this.specifications.value);
      formData.append('stock', this.stock.value);
      if(this.selectedFiles!.length > 0){
        for(let i = 0; i < this.selectedFiles!.length; i++) {
          formData.append('images', this.selectedFiles![i]);
        }
      }
      if(this.principalImage.value.toString().includes('/')){
        formData.append('principalUrl', this.principalImage.value!);
      }else{
        formData.append('namePrincipal', this.principalImage.value!);
      }
      if(this.imagesToDelete.length > 0){
        for(let i = 0; i < this.imagesToDelete.length; i++) {
          formData.append('imagesUrl', this.imagesToDelete[i]);
        }
      }
      formData.append('lastModifiedAt' , new Date().toISOString().slice(0, 19).replace('T', ' ') );

      formData.forEach((value,key) => {
        console.log(key + ' ' + value);
      });

      this.adminService.updateProduct(this.productId,formData).subscribe(
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


  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.listCategories = res;

      },
      (error: any) => {
        this.snackBar.open('Error loading categories', 'Close', {
          duration: 7000,
        });
        console.log(error);
      }
    );
  }
  
  
}