import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthNavigationService {
  router: Router = inject(Router);

  navigateToLoginPage(){
    this.router.navigate(["login"]).then()
  }

  navigateToHomePage(){
    this.router.navigate(["home"]).then()
  }

  signOutToLoginPage(){
    localStorage.removeItem("authToken")
    this.navigateToLoginPage();
  }

}
