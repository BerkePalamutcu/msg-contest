import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../interfaces/UserInterface";
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http:HttpClient = inject(HttpClient);

  registerUser(userData: User ){
    return this.http.post('http://localhost:8080/users/register', {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      lastName: userData.lastName,
      address: userData.address
    }, {
      headers: {'Content-Type': 'application/json'}
    })
  }
}
