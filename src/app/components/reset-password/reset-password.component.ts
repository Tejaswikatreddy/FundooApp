import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../core/services/UserService/user.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  model: any = {
    "password": ""
  };
  hide = true;

  constructor(
    public route: ActivatedRoute, public userservice: UserService,private router:Router) { }
  public accessToken = this.route.snapshot.params.forgotToken;
  ngOnInit() {
  }
  public input = new FormData();
  // Add your values in here
  set() {
    localStorage.setItem("id", this.accessToken)
    let body = {
      "newPassword": this.model.password
    }
    if (this.model.password.length == 0) {
      return;
    }
    this.userservice.setPassword(this.getFormUrlEncoded(body), this.accessToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        localStorage.removeItem("id")
        this.router.navigate(['login'])
      })
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
