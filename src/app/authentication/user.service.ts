import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "../shared/interfaces/IUSER";
import {IBOARD} from "../shared/interfaces/IBOARD";
import {IPROJECT} from "../shared/interfaces/IPROJECT";
import {ITASKENUMS} from "../shared/interfaces/ITASKENUMS";


const wanConnection = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})



export class UserService {

  constructor(private http: HttpClient) { }


  login(data: { email: string }) {
    return this.http.post<IUSER>(`${wanConnection}/users/login`,data ,{
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
  }

  register(data: { firstName: string, lastName: string, email: string}) {

    return this.http.post<IUSER>(`${wanConnection}/users/register`,data,{
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
  }

  logout() {
    return this.http.post(`${wanConnection}/users/logout`,{},{
      observe: "response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateUserInfo() {
   return  this.http.get<IUSER>(`${wanConnection}/users/check`,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  createNewProject(data:{title:string,key:string}) {
    return this.http.post(`${wanConnection}/project/create`,data,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateUsersBoardCreate() {
    return this.http.get<IUSER[]>(`${wanConnection}/board/create`,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  createNewBoard(data:{name:string,members:IUSER[]}) {
    return this.http.post(`${wanConnection}/board/create`,data,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  //TASK component
  populateProjects() {
    return this.http.get<IPROJECT[]>(`${wanConnection}/field/projects`,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateBoards() {
    return this.http.get<IBOARD[]>(`${wanConnection}/field/boards`,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateEnums() {
    return this.http.get<ITASKENUMS>(`${wanConnection}/field/enums`, {
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

  populateAssignedTo(id:number){
    return this.http.get<IUSER[]>(`${wanConnection}/field/board/members/`+id,{
      observe:"response",
      withCredentials: true,
      responseType: 'json'
    })
  }

}
