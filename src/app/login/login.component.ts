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
import { AuthService } from '../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private snackBar:MatSnackBar, private authService: AuthService, private router: Router) { }
  hide1?:boolean;
  token:string = '';
  role?:string;
  
  validateForm!: FormGroup;

  get username() { return this.validateForm.controls['username']; }
  get password() { return this.validateForm.controls['password']; }

  ngOnInit(): void {
    this.hide1 = true;
    
    this.validateForm = this.fb.group({
      username: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  checkForErrorsIn(formControl: AbstractControl, field:string): string {
    
    if (formControl.hasError('required')) {
      return `This ${field} is required`;
    }
    if (formControl.hasError('email')) {
      return `Not a valid ${field}`;
    }
    return '';
  }
  submitForm(): void {
    console.log(this.validateForm.value);
    this.authService.login(this.username.value,this.password.value).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          const user = StorageService.getUser();
          
          this.snackBar.open('Welcome  /'+(user.username)+'/  ,you exist in the database', 'Ok', {
            duration: 5000,
          });
          if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('/admin/dashboard');
          }
          if(StorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl('/customer/dashboard');
          }
        }else{
          this.snackBar.open('Something went wrong, please try again later', 'Close', {
            duration: 5000,
          });
        }
        
        
      },
      (err:any) => {
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          return;
        }
        let message = "Invalid Credentials";
        console.log(err);
        if(err.error.corps.type == 'BAD_CREDENTIALS'){
          message = "Invalid Credentials";
        }
        if(err.error.corps.type == 'ACCOUNT_DISABLED'){
          message = "The account with this Email is Disabled";
        }

        this.snackBar.open(message, 'Close', {
          duration: 5000,
        });
        //this.validateForm.markAllAsTouched();
      }
    );
  }
}
