import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthNavigationService} from "../services/utils/auth-navigation.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const authNavigationService = inject(AuthNavigationService);

  const token = localStorage.getItem("authToken")

  if(token){
    authNavigationService.navigateToHomePage()
    return false;
  } else {
    return true;
  }

};
