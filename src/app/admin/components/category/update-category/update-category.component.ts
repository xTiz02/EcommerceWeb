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
@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  constructor(private fb: FormBuilder,private router: Router,private snackBar: MatSnackBar,private adminService: AdminService,private activatedRoute: ActivatedRoute) {}

  categoryId:number = this.activatedRoute.snapshot.params['categoryId']; 
  validateForm!: FormGroup;
  imageUrl?: string;
  existingImage?: boolean;;
  selectedFile? : File | null;
  imagePreview?: string | ArrayBuffer | null;

  get name() { return this.validateForm.controls['name']; }
  get description() { return this.validateForm.controls['description']; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      description: [null, [Validators.required,Validators.maxLength(70)]],
    });
    this.getCategoryById();
  }

  onFileSelected(event:any){
    
    //si no se escohge ninguna imagen
    if(event.target.files.length === 0){
      this.selectedFile = null;
      this.existingImage=true;
      return;
    } 
    this.selectedFile = <File>event.target.files[0];
    this.existingImage=false;
    this.previewImage();
  } 
  previewImage(){
    const reader = new FileReader();
    reader.onload = (e:any)=>{
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile!);
    
  }
  getCategoryById():void{
    this.adminService.getCategoryById(this.categoryId).subscribe((res:any)=>{
      console.log(res);
      this.validateForm.patchValue(res.corps.data);
      this.imageUrl = res.corps.data.imgUrl;
      this.existingImage=true;
    },(err:any)=>{
      console.log(err);
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


    return '';
  }
  updateCategory(): void {
    console.log(this.validateForm.value);
    if(this.validateForm.valid){

      const formData: FormData = new FormData();
      formData.append('name', this.name.value);
      formData.append('description', this.description.value);
      formData.append('lastModifiedAt' , new Date().toISOString().slice(0, 19).replace('T', ' ') );
      if(this.selectedFile){
        console.log("selectedFile")
        formData.append('img', this.selectedFile);
      }else{
        console.log("existingImage")
        formData.append('imgUrl', this.imageUrl!);
      }
      // formData.forEach((value,key) => {
      //   console.log(key+" "+value);
      // }
      //);
      this.adminService.updateCategory(this.categoryId,formData).subscribe(
        (res:any) => {
          console.log(res);
          if(res){
            this.snackBar.open('Category update Successfully', 'Close', {
              duration: 5000,
            });
            //reload the page
            //this.router.navigateByUrl('/admin/categories');
          }
        },
        (err:any) => {
          console.log(err);
          if(err.status==0){
            this.snackBar.open('Server not working...', 'Close', {
              duration: 7000,
            });
            return;
          }
          if(err.error.corps.type=='DUPLICATE_DATA'){
            this.name.setErrors({nameInUse: true});
            this.snackBar.open('The name is already in use', 'Close', {
              duration: 7000,panelClass: ['mat-toolbar', 'mat-warn']
            });
            this.name.markAsTouched();
          }
        }
      );
    }else{
      this.validateForm.markAllAsTouched();//hace que todos los campos se marquen como tocados
    }
  }
}
