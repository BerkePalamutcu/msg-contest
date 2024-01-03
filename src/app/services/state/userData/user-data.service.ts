import { Injectable } from '@angular/core';
import {User} from "../../../interfaces/UserInterface";
import {BehaviorSubject, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private userData = new BehaviorSubject< User | null>(null);
  currentUserData:Observable<User | null> = this.userData.asObservable();
  updateUserData(data: User): void{
    this.userData.next(data);
  }

  clearUserData(){
    this.userData.next(null);
  }

  getCurrentUserData(){
    return this.currentUserData
  }
}
