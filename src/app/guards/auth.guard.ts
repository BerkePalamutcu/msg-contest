import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthNavigationService} from "../services/utils/auth-navigation.service";
export const authGuard: CanActivateFn = (route, state) => {
  const authNavigationService= inject(AuthNavigationService);
  const token = localStorage.getItem("authToken");
  if(token){
    return true
  } else {
      authNavigationService.navigateToLoginPage();
    return false
  }
};
