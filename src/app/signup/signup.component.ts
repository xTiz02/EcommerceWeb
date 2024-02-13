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
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private snackBar:MatSnackBar, private authService: AuthService, private router: Router) { }

  validateForm!: FormGroup;
  hide1?:boolean;
  hide2?:boolean;
  

  get email() { return this.validateForm.controls['email']; }
  get nickname() { return this.validateForm.controls['nickname']; }
  get password() { return this.validateForm.controls['password']; }
  get checkPassword() { return this.validateForm.controls['checkPassword']; }

  ngOnInit(): void {
    this.hide1 = true;
    this.hide2 = true;
    this.validateForm = this.fb.group({
      nickname: [null, [Validators.required,Validators.minLength(4), Validators.maxLength(15),Validators.pattern(/^\S*$/)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(64)]],
      password: [null, [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      checkPassword: [null, [Validators.required,this.confirmationValidator]]
    });
  }
  
  checkForErrorsIn(formControl: AbstractControl, field:string): string {
    
    if (formControl.hasError('required')) {
      return `This ${field} is required`;
    }
    if (formControl.hasError('email')) {
      return `Not a valid ${field}`;
    }
    if (formControl.hasError('minlength')) {
      
      return `Minimum ${field} length is ` + formControl.errors?.['minlength'].requiredLength;
    }
    if (formControl.hasError('maxlength')) {
      return `Maximum ${field} length is ` + formControl.errors?.['maxlength'].requiredLength;
    }
    if(formControl.hasError('confirm')){
      return `The passwords do not match`;
    }

    if(formControl.hasError('pattern')){
      const patternError = (formControl.errors?.['pattern'].requiredPattern).toString();
      let message = '';
      switch(patternError){
        case (/^\S*$/).toString():
          message = `The ${field} cannot contain spaces`;
          break;
        case (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).toString():
          message = `The ${field} must contain at least 1 uppercase letter, 1 lowercase letter and 1 number`;
          break;
        default:
          message = `Invalid ${field}`;
      }
      return message;
    }

    return '';
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) { 
      return { required: true };//si el campo esta vacio
    } else if (control.value !== this.password.value) {
      return { confirm: true, error: true };//si el campo no es igual al campo password
    }
    return {};
  }


  submitForm(): void {
    if(this.password.value !== this.checkPassword.value){
      this.snackBar.open('The passwords do not match', 'Close', {
        duration: 7000, panelClass: ['mat-toolbar', 'mat-warn']
      });
      return;
    }
    console.log(this.validateForm.value);
    this.authService.registerUser(this.validateForm.value).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('User registered successfully', 'Close', {
          duration: 7000, panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
          return;
        }
        if(err.error.corps.type=='DUPLICATE_EMAIL'){
          this.email.setErrors({emailInUse: true});
          this.snackBar.open('The email is already in use', 'Close', {
            duration: 7000, panelClass: ['mat-toolbar', 'mat-warn']
          });
          this.email.markAsTouched();
        }
        if(err.error.corps.type=='DUPLICATE_NICKNAME'){
          this.nickname.setErrors({nicknameInUse: true});
          this.snackBar.open('The nickname is already in use', 'Close', {
            duration: 7000, panelClass: ['mat-toolbar', 'mat-warn']
          });
          this.nickname.markAsTouched();
        }
        if(err.error.corps.type=='ERROR'){
          this.snackBar.open('The data is invalid', 'Close', {
            duration: 7000, panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      }
    );
  }
}
