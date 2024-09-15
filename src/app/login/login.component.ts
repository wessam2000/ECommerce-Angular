import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';

  onSubmit(form: any) {
    console.log(form);

    if (form.valid) {
      console.log('Form Submitted', form.value);
    } else if (form.controls.email.invalid || form.controls.password.invalid) {
      console.log('Email or Password is invalid');
    }
  }
}
