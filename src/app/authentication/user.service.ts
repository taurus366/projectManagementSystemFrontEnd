import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "../shared/interfaces/IUSER";
import {IBOARD} from "../shared/interfaces/IBOARD";
import {IPROJECT} from "../shared/interfaces/IPROJECT";
import {ITASKENUMS} from "../shared/interfaces/ITASKENUMS";
import {IBOARDINFO} from "../shared/interfaces/IBOARDINFO";
import {ITASKINFO} from "../shared/interfaces/ITASKINFO";
import {IPROJECTINFO} from "../shared/interfaces/IPROJECTINFO";
import {IEDITBOARD} from "../shared/interfaces/IEDITBOARD";


const wanConnection = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http: HttpClient) {
  }


  login(data: { email: string }) {
    return this.http.post<IUSER>(`${wanConnection}/users/login`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
  }

  register(data: { firstName: string, lastName: string, email: string }) {

    return this.http.post<IUSER>(`${wanConnection}/users/register`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
  }

  logout() {
    return this.http.post(`${wanConnection}/users/logout`, {}, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateUserInfo() {
    return this.http.get<IUSER>(`${wanConnection}/users/check`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  createNewProject(data: { title: string, key: string }) {
    return this.http.post(`${wanConnection}/project/create`, data, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateUsersBoardCreate() {
    return this.http.get<IUSER[]>(`${wanConnection}/board/create`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  //CREATE NEW BOARD
  createNewBoard(data: { name: string, members: IUSER[] }) {
    return this.http.post(`${wanConnection}/board/create`, data, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  //EDIT CURRENT BOARD
  editCurrentBoard(boardId: number, data: { name: string, members: IUSER[] }) {
    return this.http.put(`${wanConnection}/board/edit/board/` + boardId, data, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  //TASK component
  populateProjects() {
    return this.http.get<IPROJECT[]>(`${wanConnection}/field/projects`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateBoards() {
    return this.http.get<IBOARD[]>(`${wanConnection}/field/boards`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateEnums() {
    return this.http.get<ITASKENUMS>(`${wanConnection}/field/enums`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateAssignedTo(id: number) {
    return this.http.get<IUSER[]>(`${wanConnection}/field/board/members/` + id, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  createTask(data: { project: number, title: string, point: number, description: string }, board: number, type: string, assignedTo: number, priority: string, status: string) {
    console.log(data.title)
    return this.http.post(`${wanConnection}/task/create`, {
      project: data.project,
      title: data.title,
      storyPoints: data.point,
      description: data.description,
      board: board,
      type: type,
      assignedTo: assignedTo,
      priority: priority,
      status: status
    }, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  BOARD TABLE
  populateParticipatedBoards() {
    return this.http.get<IBOARDINFO[]>(`${wanConnection}/board/participate/board`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  TASK TABLE
  populateOwnTasks() {
    return this.http.get<ITASKINFO[]>(`${wanConnection}/task/own/task`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  PROJECT TABLE
  populateOwnProjects() {
    return this.http.get<IPROJECTINFO[]>(`${wanConnection}/project/own/project`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  EDIT BOARD
  populateEditBoard(boardId: number) {
    return this.http.get<IEDITBOARD>(`${wanConnection}/board/edit/board/` + boardId, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  OWN BOARD
  populateOwnBoards() {
    return this.http.get<IBOARDINFO[]>(`${wanConnection}/board/own/board`, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  DELETE BOARD BY ID
  deleteBoardById(boardId: number) {
    return this.http.delete(`${wanConnection}/board/delete/` + boardId, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  DELETE PROJECT BY ID
  deleteProjectById(projectId: number) {
    return this.http.delete(`${wanConnection}/project/delete/` + projectId, {
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

//  SEARCH TASK
  searchForTask(data:{title:string,type:string,assignedTo:string}) {

    let result:string = '?';
    result += data.title.length > 0 ?'title='+ data.title : '';
    result += data.title.length > 0 && data.type.length > 0 ? '&type='+data.type : data.type.length > 0 ? 'type='+data.type : '';
    result += data.title.length > 0 && data.assignedTo.length > 0 || data.type.length > 0 && data.assignedTo.length > 0 ? '&assignedTo='+data.assignedTo : data.assignedTo.length > 0 ? 'assignedTo='+data.assignedTo : '';

    return this.http.get<ITASKINFO[]>(`${wanConnection}/task/search${result}`,{
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }


}
