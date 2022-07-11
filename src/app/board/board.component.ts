import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../authentication/user.service";
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";
import {NgForm} from "@angular/forms";
import {IBOARD} from "../shared/interfaces/IBOARD";
import {filter} from "rxjs";


const navigateAfterCreateBoard: string = "/profile";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  // encapsulation: ViewEncapsulation.None
})


export class BoardComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private sharedService: BooleansAndMethodsService) {
  }

  isEditBoard: boolean = false;
  isNameIncorrect: boolean = false;
  isUsersToAddIncorrect: boolean = false;
  usersFromDB: IBOARD[] | undefined;
  usersToAdd: IBOARD[] | undefined;

  errorText: string = "";

  ngOnInit(): void {
    this.chooseEditOrCreate();
    this.populateUsersForCreate();
  }

  preventDefault($event: MouseEvent): void {
    this.sharedService
      .preventDefault($event);
  }

  chooseEditOrCreate(): void {
    this.activeRoute.params.subscribe(({type}) => {
      switch (type) {
        case "edit":
          this.isEditBoard = true;
          break;
        case "create":
          this.isEditBoard = false;
          break;
      }
    })
  }

  createBoard(form: NgForm) {
    this.restartAllFields();
    if (this.usersToAdd == undefined || this.usersToAdd.length == 0){
      this.errorText = "Please add at least one person to board";
      this.isUsersToAddIncorrect = true;
      return;
    }else {
      this.isUsersToAddIncorrect = false;
      this.errorText = "";
    }

    if (form.invalid) {
      console.log("err")
      let formControl = form.controls;

      switch (formControl['name'].status) {
        case "INVALID":
          this.isNameIncorrect = true;
          this.errorText = "Please check Name";
          break;
        case "VALID":
          this.isNameIncorrect = false;
          break;
      }
      return;
    }

    this.userService
      .createNewBoard({name:form.value.name,members:this.usersToAdd})
      .subscribe({
        next:value => {},
        error:err => {},
        complete:() => {
          this.sharedService
            .navigate("/profile");
        }
      })


  }

  populateUsersForCreate(): void {
    this.userService
      .populateUsersBoardCreate()
      .subscribe({
        next: value => {
          if (value.body != null) {

            this.usersFromDB = value.body;

          }

        },
        error: err => {
          let text: string = "";
          Array.from(err.error)
            .forEach(value => {
              // @ts-ignore
              let defaultMessage = value.defaultMessage.toString();

              // @ts-ignore
              let field = value.field.toString().toLowerCase();

              switch (field) {
                case "title":
                  this.isNameIncorrect = true;
                  break;
                case "key":
                  this.isNameIncorrect = true;
                  break;
              }

              text += `/${defaultMessage}/`;
            });
          this.errorText = text.slice(1, text.length - 1);

        },
        complete: () => {
        }
      })
  }

//  USERS
  addUserToBoard(user: IBOARD): void {

    if (this.usersToAdd == undefined) {
      this.usersToAdd = [user];
    } else {
      this.usersToAdd.push(user);
    }
    this.addUserToBoardRemoveFromDB(user);
  }
  addUserToBoardRemoveFromDB(user: IBOARD) {
    // @ts-ignore
    this.usersFromDB = this.usersFromDB.filter(value => value.id !== user.id);
  }

  removeUserFromBoard(user: IBOARD) {

    // @ts-ignore
    this.usersToAdd = this.usersToAdd.filter(value => value.id !== user.id);

    this.addUserToUsersFromDB(user);
  }
  addUserToUsersFromDB(user: IBOARD) {
    if (this.usersFromDB == undefined) {
      this.usersFromDB = [user];
    } else {
      this.usersFromDB?.push(user);
    }
  }


  private restartAllFields():void {
    this.isUsersToAddIncorrect = false;
    this.isEditBoard = false;
    this.errorText = "";
  }
}
