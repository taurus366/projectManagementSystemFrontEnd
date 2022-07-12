import {Component, OnInit} from '@angular/core';
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";
import {UserService} from "../authentication/user.service";
import {ActivatedRoute} from "@angular/router";
import {IPROJECT} from "../shared/interfaces/IPROJECT";
import {IBOARD} from "../shared/interfaces/IBOARD";
import {ITASKENUMS} from "../shared/interfaces/ITASKENUMS";
import {IUSER} from "../shared/interfaces/IUSER";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private sharedService: BooleansAndMethodsService, private userService: UserService) {
  }


  isEditTask: boolean = false;

  projectAccountOwner: IPROJECT[] | undefined;
  boards: IBOARD[] | undefined;
  enums: ITASKENUMS | undefined;
  assignedTo: IUSER[] | undefined;

  statusText: string = 'NEW';
  priorityText: string = 'LOW';
  boardIndex: number = 0;
  assignedToIndex: any = 0;
  typeSelectedText: string = '';

  isTitleIncorrect: boolean = false;
  isProjectUnSelected: boolean = false;
  isBoardUnSelected: boolean = false;
  isTypeIncorrect: boolean = false;

  errorText: string = '';

  ngOnInit(): void {
    this.chooseEditOrCreate();
  }

  chooseEditOrCreate(): void {
    this.activeRoute.params.subscribe(({type}) => {
      switch (type) {
        case "edit":
          this.isEditTask = true;
          break;
        case "create":
          this.isEditTask = false;
          this.populateProjects();
          this.populateBoards();
          this.populateEnums();
          break;
      }
    })
  }


  populateProjects(): void {
    this.userService
      .populateProjects()
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.projectAccountOwner = value.body;
          } else {
            this.projectAccountOwner = [];
          }
        },
        error: err => {
        },
        complete: () => {
        }
      })
  }

  populateBoards(): void {

    this.userService
      .populateBoards()
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.boards = value.body;
          } else {
            this.boards = [];
          }
        },
        error: err => {
        },
        complete: () => {
        }
      })
  }

  populateEnums(): void {
    this.userService
      .populateEnums()
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.enums = value.body;
          } else {
            this.enums = {priority: [], status: [], type: []};
          }
        },
        error: err => {
        },
        complete: () => {
        }
      })
  }

  populateAssignedTo(id: any): void {
    this.userService
      .populateAssignedTo(parseInt(id))
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.assignedTo = value.body;
            this.boardIndex = parseInt(id);
          } else {
            this.assignedTo = [];
          }
        },
        error: err => {
        },
        complete: () => {

        }
      })
  }

  createNewTask(form: NgForm): void {
    console.log(form.controls)
    if (form.invalid) {

      let formControl = form.controls;

      switch (formControl['project'].status) {
        case "INVALID":
          this.isProjectUnSelected = true;
          this.errorText = "select Project";
          break;
        case "VALID":
          this.isProjectUnSelected = false;
          this.errorText = "";
          break;
      }

      switch (formControl['title'].status) {
        case "INVALID":
          this.isTitleIncorrect = true;
          this.errorText = "Check title"
          break;
        case "VALID":
          this.isTitleIncorrect = false;
          this.errorText = "";
          break;
      }
    return;
    }

    if (this.boardIndex == 0) {
      this.isBoardUnSelected = true;
      return;
    }else {
      this.isBoardUnSelected = false;
    }

    if (this.typeSelectedText.length == 0){
      this.isTypeIncorrect = true;
      return;
    }else {
      this.isTypeIncorrect = false;
    }

  this.userService
    .createTask(form.value,this.boardIndex,this.typeSelectedText.replace(" ","_"),parseInt(this.assignedToIndex),this.priorityText.replace(" ","_"),this.statusText.replace(" ","_"))
    .subscribe({
      next:value => {},
      error:err => {

      },
      complete:() => {
        this.sharedService
          .navigate("/profile");
      }
    })
  }

}
