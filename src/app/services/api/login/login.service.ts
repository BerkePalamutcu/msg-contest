import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../../../interfaces/LoginInterface";
import {AuthResponse} from "../../../interfaces/AuthResponse.interface";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http: HttpClient = inject(HttpClient)
  loginUser(loginData: Login){
    return this.http.post<AuthResponse>('http://localhost:8080/users/auth', {
      email: loginData.email,
      password: loginData.password,
    }, {
      headers: {'Content-Type': 'application/json'}
    })
  }
}
