import { Component } from '@angular/core';
//import to ngModel
import { FormsModule } from '@angular/forms';
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
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-post-product-unit',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule,MatSelectModule,MatRadioModule,FormsModule],
  templateUrl: './post-product-unit.component.html',
  styleUrl: './post-product-unit.component.scss'
})
export class PostProductUnitComponent {
  constructor(private fb: FormBuilder,private router: Router,private snackBar: MatSnackBar,private adminService: AdminService,private activatedRoute: ActivatedRoute) {}


  productId:number = this.activatedRoute.snapshot.params['productId'];
  validateForm!: FormGroup;
  selectedFiles? : File[] | null = [];
  imagesPreview?: string[] | ArrayBuffer[] | null= [];
  colors: string[] = ['Black', 'White', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Gray', 'Brown', 'Pink', 'Cyan', 'Magenta', 'Lime', 'Teal', 'Indigo', 'Maroon', 'Navy', 'Olive', 'Silver', 'Dark', 'Gold', 'Sky', 'Violet', 'Turquoise', 'Beige', 'Tan', 'Aquamarine', 'Salmon', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender', 'Coral', 'Khaki', 'Mauve', 'Crimson', 'Plum', 'Lavender', 'Ivory', 'Azure', 'Lemon', 'Peach', 'Mint', 'Lilac', 'Tangerine', 'Aqua', 'Lavender'];
  get name() { return this.validateForm.controls['name']; }
  get description() { return this.validateForm.controls['description']; }
  get price() { return this.validateForm.controls['price']; }
  get categoryId() { return this.validateForm.controls['categoryId']; }
  get characteristics() { return this.validateForm.controls['characteristics']; }
  get specifications() { return this.validateForm.controls['specifications']; }
   get color() { return this.validateForm.controls['color']; }
  get stock() { return this.validateForm.controls['stock']; }
  get priceModifier() { return this.validateForm.controls['priceModifier']; }



  ngOnInit(): void {
   
    this.validateForm = this.fb.group({
      color : [null, [Validators.required]],
      stock: [null, [Validators.required,Validators.min(1)]],
      priceModifier: [null, [Validators.min(1)]],
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
  onFileSelected(event:any){
    this.imagesPreview = [];
    this.selectedFiles = [];
    //si no se escohge ninguna imagen
    if(event.target.files.length === 0){
      console.log("No se selecciono ninguna imagen");
      console.log(this.selectedFiles);
      return;
    } 
    //agregar (principal) en al nombre de la primera imagen
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
  addProduct(): void {
    console.log(this.selectedFiles)
    if(this.selectedFiles?.length === 0){
      this.snackBar.open('You must select an image', 'Close', {
        duration: 7000,
      });
      return;
    }
    if(this.validateForm.valid){
      console.log(this.validateForm.value);
      const formData: FormData = new FormData();
      
       formData.append('color', this.color.value);
      formData.append('stock', this.stock.value);
      if(this.priceModifier.value != null && this.priceModifier.value != ''){
        formData.append('priceModifier', this.priceModifier.value);
      }
      formData.append('productId', this.productId.toString());
      for (let i = 0; i < this.selectedFiles!.length; i++) {
        formData.append('images', this.selectedFiles![i]);
      }

      this.adminService.postProductUnit(formData,this.productId).subscribe(
        (res: any) => {
          console.log(res);
          this.snackBar.open('Product unit created successfully', 'Close', {
            duration: 7000,
          });
          //this.router.navigateByUrl('/admin/products');
        },
        (err: any) => {
          console.log(err);
          if(err.status==0){
            this.snackBar.open('Server not working...', 'Close', {
              duration: 7000,
            });
            return;
          }
          this.snackBar.open('Error creating product unit', 'Close', {
            duration: 7000,
          });
          
        }
      );
    }else{
      this.snackBar.open('Error creating product', 'Close', {
        duration: 7000,
      });
    }
    
  }
  
  //se le ennvia al MultiPartFile
  // File {name: 'celulares.jpg', lastModified: 1706113437231, lastModifiedDate: Wed Jan 24 2024 11:23:57 GMT-0500 (hora estándar de Perú), webkitRelativePath: '', size: 42266}  
  
}
