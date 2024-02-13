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
@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {
  constructor(private fb: FormBuilder,private router: Router,private snackBar: MatSnackBar,private adminService: AdminService) {}

  validateForm!: FormGroup;
  selectedFile? : File | null;
  imagePreview?: string | ArrayBuffer | null;

  get name() { return this.validateForm.controls['name']; }
  get description() { return this.validateForm.controls['description']; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      description: [null, [Validators.required,Validators.maxLength(70)]],
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


    return '';
  }
  onFileSelected(event:any){
    
    //si no se escohge ninguna imagen
    if(event.target.files.length === 0){
      return;
    } 
    this.selectedFile = <File>event.target.files[0];
    this.previewImage();
  } 
  previewImage(){
    const reader = new FileReader();
    reader.onload = (e:any)=>{
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }


  addCategory(): void {
    if(!this.selectedFile){
      this.snackBar.open('You must select an image', 'Close', {
        duration: 7000,
      });
      return;
    }
    console.log(this.validateForm.value);
    if(this.validateForm.valid){

      const formData: FormData = new FormData();
      formData.append('name', this.name.value);
      formData.append('description', this.description.value);
      formData.append('createdAt' , new Date().toISOString().slice(0, 19).replace('T', ' ') );
      formData.append('img', this.selectedFile!);
      // formData.forEach((value,key) => {
      //   console.log(key+" "+value);
      // }
      //);
      this.adminService.postCategory(formData).subscribe(
        (res:any) => {
          console.log(res);
          if(res){
            this.snackBar.open('Category Added Successfully', 'Close', {
              duration: 5000,
            });
            this.router.navigateByUrl('/admin/category');
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
