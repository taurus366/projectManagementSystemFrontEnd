import { Component, OnInit } from '@angular/core';
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";
import {UserService} from "../authentication/user.service";
import {ActivatedRoute} from "@angular/router";
import {IPROJECT} from "../shared/interfaces/IPROJECT";
import {IBOARD} from "../shared/interfaces/IBOARD";
import {ITASKENUMS} from "../shared/interfaces/ITASKENUMS";
import {IUSER} from "../shared/interfaces/IUSER";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute, private sharedService: BooleansAndMethodsService, private userService:UserService) { }


  isEditTask: boolean = false;

  projectAccountOwner: IPROJECT[] | undefined;
  boards: IBOARD[] | undefined;
  enums: ITASKENUMS | undefined;
  assignedTo: IUSER[] | undefined;


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


  populateProjects():void {
  this.userService
    .populateProjects()
    .subscribe({
      next:value => {
        if (value.body != null){
          this.projectAccountOwner = value.body;
        } else {
          this.projectAccountOwner = [];
        }
      },
      error:err => {
      },
      complete:() => {
      }
    })
  }

  populateBoards():void {

    this.userService
      .populateBoards()
      .subscribe({
        next:value => {
          if (value.body != null) {
            this.boards = value.body;
          } else {
            this.boards = [];
          }
        },
        error:err => {},
        complete:() => {}
      })
  }

  populateEnums():void {
  this.userService
    .populateEnums()
    .subscribe({
      next:value => {
        if (value.body != null){
          this.enums = value.body;
        } else {
          this.enums = {priority : [],status:[]};
        }
      },
      error:err => {},
      complete:() => {}
    })
  }

  populateAssignedTo(id:any): void {
    this.userService
      .populateAssignedTo(parseInt(id))
      .subscribe({
        next:value => {
          if (value.body != null) {
            this.assignedTo = value.body;
          }else {
            this.assignedTo = [];
          }
        },
        error:err => {},
        complete:() => {}
      })
  }

  createNewTask():void {

  }

}
