import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; 

  constructor(private fb: FormBuilder) {}
  verifyPassword(controlPass: string, matchingControlPass: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlPass];
      const matchingControl = formGroup.controls[matchingControlPass];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return; 
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['wessam@gmail.com', [Validators.required, Validators.email]],
      name: ['wessam', Validators.required],
      username: ['Wessam20', [Validators.required, Validators.pattern(/^\S+$/)]],
      password: ['Wessam@123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.verifyPassword('password', 'confirmPassword')
    });
  }

  get email() { return this.registerForm.get('email'); }
  get name() { return this.registerForm.get('name'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
    } else if (this.registerForm.invalid) {
      console.log('Form is invalid');
      if (this.email?.errors?.['required']) {
        console.log('Email is required');
      } else if (this.email?.errors?.['email']) {
        console.log('Invalid email format');
      }
      if (this.name?.errors?.['required']) {
        console.log('Name is required');
      }
      if (this.username?.errors?.['required']) {
        console.log('Username is required');
      } else if (this.username?.errors?.['pattern']) {
        console.log('Username must not contain spaces');
      }
      if (this.password?.errors?.['required']) {
        console.log('Password is required');
      } else if (this.password?.errors?.['pattern']) {
        console.log('Password must contain at least one uppercase, one lowercase, one digit, and one special character, and be at least 8 characters long.');     
      }
    }
  }
}
