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
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-post-product',
  standalone: true,
  imports:  [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule,MatSelectModule,MatRadioModule,FormsModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {
  constructor(private fb: FormBuilder,private router: Router,private snackBar: MatSnackBar,private adminService: AdminService) {}

  validateForm!: FormGroup;
  selectedFiles? : File[] | null = [];
  imagesPreview?: string[] | ArrayBuffer[] | null= [];
  listCategories: any = [];
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
      name: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      description: [null, [Validators.required,Validators.maxLength(70)]],
      price: [null, [Validators.required,Validators.min(1)]],
      characteristics: [null, [Validators.required]],
      specifications: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      principalImage: [null, [Validators.required]],
      // color : [null, []],
      stock: [null, [Validators.required,Validators.min(1)]],
      // priceModifier: [null, []],
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
    this.principalImage?.setValue(null);
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
    this.principalImage?.setValue(this.selectedFiles![0].name);
    
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
    if(this.selectedFiles?.length === 0){
      this.snackBar.open('You must select an image', 'Close', {
        duration: 7000,
      });
      return;
    }
    if(this.validateForm.valid){
      console.log(this.validateForm.value);
      // const pruductJson = {
      //   name: this.name.value,
      //   description: this.description.value,
      //   price: this.price.value,
      //   categoryId: this.categoryId.value,
      //   characteristics: this.characteristics.value,
      //   specifications: this.specifications.value,
      //   productUnit:{
      //     color: this.color.value,
      //     stock: this.stock.value,
      //     priceModifier: this.priceModifier.value
      //   },
      //   createAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // };

      const formData: FormData = new FormData();
      formData.append('name', this.name.value);
      formData.append('description', this.description.value);
      formData.append('price', this.price.value);
      formData.append('categoryId', this.categoryId.value);
      formData.append('characteristics', this.characteristics.value);
      formData.append('specifications', this.specifications.value);
      // formData.append('color', this.color.value);
      formData.append('stock', this.stock.value);
      formData.append('namePrincipal', this.principalImage.value!);
      // formData.append('priceModifier', this.priceModifier.value);
      formData.append('createdAt' , new Date().toISOString().slice(0, 19).replace('T', ' ') );
      for (let i = 0; i < this.selectedFiles!.length; i++) {
        formData.append('images', this.selectedFiles![i]);
      }

      this.adminService.postProduct(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.snackBar.open('Product created successfully', 'Close', {
            duration: 7000,
          });
          this.router.navigateByUrl('/admin/product');
        },
        (err: any) => {
          console.log(err);
          if(err.status==0){
            this.snackBar.open('Server not working...', 'Close', {
              duration: 7000,
            });
            return;
          }
          this.snackBar.open('Error creating product', 'Close', {
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
  //se le ennvia al MultiPartFile
  // File {name: 'celulares.jpg', lastModified: 1706113437231, lastModifiedDate: Wed Jan 24 2024 11:23:57 GMT-0500 (hora estándar de Perú), webkitRelativePath: '', size: 42266}  
  
}
