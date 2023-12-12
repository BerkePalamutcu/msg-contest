import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginForm implements OnInit {
  loginFormControl = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    console.log(this.loginFormControl.get('email')?.value);
    this.loginFormControl.get('email')?.valueChanges.subscribe(console.log);
  }

  getErrorMessage() {
    if (this.loginFormControl.get('email')?.hasError('required')) {
      return 'You must enter a value';
    } else {
      return this.loginFormControl.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
    }
  }
}
