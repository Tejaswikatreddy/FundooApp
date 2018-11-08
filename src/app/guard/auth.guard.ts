import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from "../services/auth.service"
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private auth: AuthService){}
  canActivate(){
    if (this.auth.getToken()){
      
      return true;
    }
  this.router.navigate(['login']);
    return false;
  }
}
