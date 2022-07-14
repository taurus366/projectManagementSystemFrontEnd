import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../authentication/user.service";
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";
import {NgForm} from "@angular/forms";
import {IUSER} from "../shared/interfaces/IUSER";
import {IEDITBOARD} from "../shared/interfaces/IEDITBOARD";

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
  usersFromDB: IUSER[] | undefined;
  usersToAdd: IUSER[] | undefined;

  editBoard: IEDITBOARD | undefined;

  errorText: string = "";

  ngOnInit(): void {
    this.chooseEditOrCreate()
      .then(value => {
        this.populateUsersForCreate();
      })

  }

  preventDefault($event: MouseEvent): void {
    this.sharedService
      .preventDefault($event);
  }

  chooseEditOrCreate(): Promise<any> {
    return new Promise<void>((resolve, reject) => {

      this.activeRoute.params.subscribe(({type, id}) => {
          switch (type) {
            case "edit":
              this.isEditBoard = true;
              this.populateEditBoard(id)
                .then(value => {
                  resolve();
                })
              break;
            case "create":
              this.isEditBoard = false;
              resolve();
              break;
          }
        }
      )

    })
  }

  populateEditBoard(boardId: number): Promise<any> {

    return new Promise<void>(((resolve, reject) => this.userService
      .populateEditBoard(boardId)
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.editBoard = value.body;
          }
        },
        error: err => {
        },
        complete: () => {
          this.usersToAdd = this.editBoard?.members;
          resolve();
        }
      })));

  }

  createBoard(form: NgForm) {
    this.restartAllFields();
    if (this.usersToAdd == undefined || this.usersToAdd.length == 0) {
      this.errorText = "Please add at least one person to board";
      this.isUsersToAddIncorrect = true;
      return;
    } else {
      this.isUsersToAddIncorrect = false;
      this.errorText = "";
    }

    if (form.invalid) {
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
      .createNewBoard({name: form.value.name, members: this.usersToAdd})
      .subscribe({
        next: value => {
        },
        error: err => {
        },
        complete: () => {
          this.sharedService
            .navigate("/profile");
        }
      })


  }

  editBoardTable(form: NgForm) {
    this.restartAllFields();

    if (this.usersToAdd == undefined || this.usersToAdd.length == 0) {
      this.errorText = "Please add at least one person to board";
      this.isUsersToAddIncorrect = true;
      return;
    } else {
      this.isUsersToAddIncorrect = false;
      this.errorText = "";
    }

    if (form.invalid) {
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
      .editCurrentBoard(this.editBoard!.id,{name: form.value.name, members: this.usersToAdd})
      .subscribe({
        next: value => {
        },
        error: err => {
        },
        complete: () => {
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

          if (this.editBoard != null) {
            this.usersToAdd
              ?.forEach(value => {
                this.usersFromDB = this.usersFromDB?.filter(value2 => value.id !== value2.id);
              })
          }
        }
      })
  }

//  USERS
  addUserToBoard(user: IUSER): void {

    if (this.usersToAdd == undefined) {
      this.usersToAdd = [user];
    } else {
      this.usersToAdd.push(user);
    }
    this.addUserToBoardRemoveFromDB(user);
  }

  addUserToBoardRemoveFromDB(user: IUSER) {
    // @ts-ignore
    this.usersFromDB = this.usersFromDB.filter(value => value.id !== user.id);
  }

  removeUserFromBoard(user: IUSER) {

    // @ts-ignore
    this.usersToAdd = this.usersToAdd.filter(value => value.id !== user.id);

    this.addUserToUsersFromDB(user);
  }

  addUserToUsersFromDB(user: IUSER) {
    if (this.usersFromDB == undefined) {
      this.usersFromDB = [user];
    } else {
      this.usersFromDB?.push(user);
    }
  }


  private restartAllFields(): void {
    this.isUsersToAddIncorrect = false;
    this.isEditBoard = false;
    this.errorText = "";
  }
}
