import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BooleansAndMethodsService} from "../../shared/booleansAndMethods.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private sharedService : BooleansAndMethodsService, private userService: UserService) {

  }

  isEmailIncorrect: boolean = false;
  errorText: string = "";

  ngOnInit(): void {
  }

  preventDefault($event: MouseEvent):void {
    this.sharedService.preventDefault($event);
  }

  login(form: NgForm) {

    if (form.invalid) {
      let formControl = form.controls;

      switch (formControl['email'].status){
        case "INVALID":
          this.isEmailIncorrect = true;
          this.errorText = "Please check email isn't valid";
        break;
        case "VALID":
          this.isEmailIncorrect = false;
          this.errorText = "";
          break;
      }

      return;
    }

    this.resetAllField();

    this.userService
      .login(form.value)
      .subscribe({
        next:value => {
          if (value.body != null){
            this.sharedService
              .user = value.body;
          }
        },
        error:err => {
          let text : string = "";
          Array.from(err.error)
            .forEach(value => {
              // @ts-ignore
              let defaultMessage = value.defaultMessage.toString();

              // @ts-ignore
              let field = value.field.toString().toLowerCase();

              switch (field) {
                case "email":
                  this.isEmailIncorrect = true;
                  break;
              }

              text += `/${defaultMessage}/`;
            });
          this.errorText = text.slice(1,text.length-1);
        },
        complete:() => {
          this.sharedService
            .navigate("/profile");
        }
      })

  }

  resetAllField():void {
    this.isEmailIncorrect = false;
    this.errorText = "";
  }

}
