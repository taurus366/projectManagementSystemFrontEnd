import { Injectable } from '@angular/core';
import {IUSER} from "./interfaces/IUSER";
import {Router} from "@angular/router";
import {UserService} from "../authentication/user.service";

@Injectable({
  providedIn: 'root'
})
export class BooleansAndMethodsService {


  constructor(private router:Router, private userService:UserService) { }

  private _user:IUSER | undefined ;

  set user(value: IUSER | undefined) {
    this._user = value;
  }

  get user(): IUSER | undefined {
    return this._user;
  }

  preventDefault($event : MouseEvent) : void {
    $event.preventDefault();
  }

  isLogged () : boolean {
    return this._user?.email !== null;
  }

  navigate(url:string): void {
    this.router.navigate([url]);
  }

  // HERE I CHECK IF THE USER HAS RELOADED HIS BROWSER PAGE , IF IT DID I WILL UPDATE AGAIN HIS INFO INTO BROWSER !
  checkUserInfoExistsThenUpdate():Promise<any> {

   return  new Promise<void>((resolve, reject) => {
      this.userService
        .populateUserInfo()
        .subscribe({
          next: value => {
            if (value.body != null) {
              this.user = value.body;
            }
          },
          error: err => {
            if (err.status == 401) {
              this.user = undefined;
            }
            resolve();
          },
          complete:() => {
            resolve();
          }
        })
    });


  }
}
