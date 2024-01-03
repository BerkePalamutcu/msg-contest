import {Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {LoginService} from "../../services/api/login/login.service";
import {Login} from "../../interfaces/LoginInterface";
import {AuthResponse} from "../../interfaces/AuthResponse.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserDataService} from "../../services/state/userData/user-data.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginForm implements OnInit {
  private router: Router = inject(Router);
  private loginService: LoginService = inject(LoginService)
  private snackbar: MatSnackBar = inject(MatSnackBar)
  private userDataService: UserDataService = inject(UserDataService)
  passVisible: string = 'visibility';

  loginFormControl = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    console.log(this.loginFormControl.get('email')?.value);
    this.loginFormControl.get('email')?.valueChanges.subscribe(console.log);
  }

  public login() {
    const data: Login = {
      email: this.loginFormControl.get("email")!.value!,
      password: this.loginFormControl.get("password")!.value!
    }
    this.loginService.loginUser(data).subscribe((response: AuthResponse) => {
      console.log(response)
      if (response.body.token) {
        this.userDataService.updateUserData(response.body)
        localStorage.setItem("authToken", response.body.token)

        this.snackbar.open("You succesfully logged in", "",
          {duration: 5000, verticalPosition: "top"})
        this.navigateToHomePage();
      } else {
        this.snackbar.open("Authentication failed try again", "",
          {duration: 5000, verticalPosition: "top"})
      }
    })
  }

  public getErrorMessage() {
    if (this.loginFormControl.get('email')?.hasError('required')) {
      return 'You must enter a value';
    } else {
      return this.loginFormControl.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
    }
  }

  public changePassVisible() {
    if (this.passVisible === 'visibility') {
      this.passVisible = 'visibility_off';
    } else {
      this.passVisible = 'visibility';
    }
  }

  navigateToRegisterPage() {
    this.router.navigate(['register']).then();
  }

  navigateToHomePage() {
    this.router.navigate(["home"]).then()
  }
}
