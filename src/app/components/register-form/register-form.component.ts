import {Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule, StepperOrientation,} from '@angular/material/stepper';
import {map, Observable} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {RegisterService} from "../../services/api/register/register.service";
import {User} from "../../interfaces/UserInterface";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private router: Router = inject(Router)
  public registerService = inject(RegisterService)
  passVisible: string = 'visibility';

  emailFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  passwordFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });
  namesFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required]
  });
 addressFormGroup = this._formBuilder.group({
   addressLine1: ['', Validators.required],
   addressLine2: [''],
 })
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  public registerToApp(){
    const registerData: User = {
      email: this.emailFormGroup.get("email")!.value!,
      password: this.passwordFormGroup.get("password")!.value!,
      name: this.namesFormGroup.get("name")!.value!,
      lastName: this.namesFormGroup.get("lastName")!.value!,
      address: this.addressFormGroup.get("addressLine1")!.value! + " " +
        this.addressFormGroup.get("addressLine2")!.value!
    }
    this.registerService.registerUser(registerData).subscribe(
      (response:any) => {
        if(response.body === "Success"){
          this.navigateToLoginPage();
        }
      }
    )
  }

  public changePassVisible() {
    if (this.passVisible === 'visibility') {
      this.passVisible = 'visibility_off';
    } else {
      this.passVisible = 'visibility';
    }
  }

  public navigateToLoginPage(){
    this.router.navigate(['login'])
  }
}
