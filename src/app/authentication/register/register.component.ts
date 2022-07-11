import {Component, OnInit} from '@angular/core';
import {BooleansAndMethodsService} from "../../shared/booleansAndMethods.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";
import {AppRoutingModule} from "../../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isFirstNameIncorrect: boolean = false;
  isLastNameIncorrect: boolean = false;
  isEmailIncorrect: boolean = false;

  errorText: string = "";

  constructor(private sharedService: BooleansAndMethodsService, private userService: UserService, private router:Router) {
  }

  ngOnInit(): void {
  }

  preventDefault($event: MouseEvent): void {
    this.sharedService.preventDefault($event);
  }

  register(form: NgForm) {

    if (form.invalid) {

      let formControl = form.controls;
      console.log(formControl)

      switch (formControl['firstName'].status) {
        case "INVALID":
          this.isFirstNameIncorrect = true;
          break;
        case "VALID":
          this.isFirstNameIncorrect = false;
          break;
      }

      switch (formControl['lastName'].status) {
        case "INVALID":
          this.isLastNameIncorrect = true;
          break;
        case "VALID":
          this.isLastNameIncorrect = false;
          break;
      }

      switch (formControl['email'].status) {
        case "INVALID":
          this.isEmailIncorrect = true;
          break;
        case "VALID":
          this.isEmailIncorrect = false;
          break;
      }

      this.errorText = "Please check red border/s";

      return;
    }

    this.restartAllFields();

    this.userService
      .register(form.value)
      .subscribe({
        next:value => {
          if (value.body != null) {
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
                case "firstname":
                  this.isFirstNameIncorrect = true;
                  break;
                case "lastname":
                  this.isLastNameIncorrect = true;
                  break;
              }

              text += `/${defaultMessage}/`;
            });
          this.errorText = text.slice(1,text.length-1);
        },
        complete:() => {
         this.sharedService.navigate("/profile");
        }
      })

  }

  private restartAllFields(): void {
    this.isFirstNameIncorrect = false;
    this.isLastNameIncorrect = false;
    this.isEmailIncorrect = false;
    this.errorText = "";
  }
}
