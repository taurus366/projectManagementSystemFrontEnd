import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../authentication/user.service";
import {IBOARDINFO} from "../shared/interfaces/IBOARDINFO";
import {ITASKINFO} from "../shared/interfaces/ITASKINFO";
import {IPROJECTINFO} from "../shared/interfaces/IPROJECTINFO";
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private sharedService:BooleansAndMethodsService) { }

  //
  isEdit: boolean = false;

  //show all boards of the owner
  isOwn: boolean = false;
  isBoard: boolean = false;
  isTask: boolean = false;
  isProject: boolean = false;

  //
  isView: boolean = false;

  // show only the boards where the current account inside
  isParticipateBoard: boolean = false;

  boards: IBOARDINFO[] | undefined;
  tasks: ITASKINFO[] | undefined;
  projects: IPROJECTINFO[] | undefined;


  ngOnInit(): void {
    this.chooseTypeOfLinkThenDoChanges();
  }

  preventDefault($event : MouseEvent): void {
    this.sharedService
      .preventDefault($event);
  }

  chooseTypeOfLinkThenDoChanges(): void {
    this.activatedRoute.params.subscribe(({who,type,which,id}) =>{
      console.log(type);
      console.log(which);
      console.log(id);
      console.log(who);

        this.restartAllWindows();
      switch (type) {
        case 'own':
          this.isOwn = true;
          if (which === 'board') {
            this.isBoard = true;
            this.populateOwnBoard();
          }else if (which === 'task'){
            this.isTask = true;
          this.populateOwnTasks();
          }else if (which === 'project'){
            this.isProject = true;
            this.populateOwnProjects();
          }
          break;
        case 'participate':
          if (which === 'board'){
            this.isParticipateBoard = true;
            this.populateParticipateBoard();
          }
          break;
      }
    })

  }

  private restartAllWindows() {
    this.isBoard = false;
    this.isTask = false;
    this.isOwn = false;
    this.isEdit = false;
    this.isProject = false;
    this.isParticipateBoard = false;
    this.isView = false;
  }

  populateParticipateBoard(): void {
    this.userService
      .populateParticipatedBoards()
      .subscribe({
        next:value => {
          if (value.body != null){
              this.boards = value.body;
          }
        },
        error:err => {},
        complete:() => {}
      })
  }

  populateOwnTasks(): void {
    this.userService
      .populateOwnTasks()
      .subscribe({
        next:value => {
          if (value.body != null) {
            this.tasks = value.body;
          }
        },
        error:err => {},
        complete:() => []
      })
  }

  populateOwnProjects() : void {
    this.userService
      .populateOwnProjects()
      .subscribe({
        next:value => {
          if (value.body != null){
            this.projects = value.body;
          }
        },
        error:err => {},
        complete:() => []
      })
  }

  populateOwnBoard(): void {
this.userService
  .populateOwnBoards()
  .subscribe({
    next:value => {
      if (value.body != null) {
        this.boards = value.body;
      }
    },
    error:err => {},
    complete:() => {}
  })
  }

// DELETE METHODS

  deleteBoardById(boardId:number):void {
    this.userService
      .deleteBoardById(boardId)
      .subscribe({
        complete:() => {
          this.boards = this.boards?.filter(value => value.id !== boardId);
        }
      })
  }

  deleteProjectById(projectId:number): void {
    this.userService
      .deleteProjectById(projectId)
      .subscribe({
        complete:() => {
          this.projects = this.projects?.filter(value => value.id != projectId);
        }
      })
  }
}
