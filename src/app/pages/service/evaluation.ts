

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
export class IntegrationPlanService {
    url = 'http://localhost:4000/eval';
    urll='http://localhost:4000/info' ; 
    url3 ='http://localhost:4000/task' ; 
    defaultUrl = 'http://localhost:3000';
   
    constructor(private http: HttpClient) { }

    public getInfo() {
        return this.http.get(this.url) ; 
    }
    public getInfoo () {
        return this.http.get(this.urll) ; 
    }
    public getInfor () {
        return this.http.get(this.url3) ; 
    }

    public getUserInfo(userId: number): Observable<any> {
        return this.http.get<any>(this.defaultUrl  + '/plan/' + userId);
    }

    public getAssignedTasks(userId): Observable<any> {
        return this.http.get<any>(this.defaultUrl + '/assignedTask?userId=' + userId);
    }

    public updateAssignedTasks(assignedTaskId, assignedTask): Observable<any> {
        return this.http.put<any>(this.defaultUrl + '/assignedTask/' + assignedTaskId, assignedTask );
    }

    public createAssignedTask(assignedTask) : Observable<any> {
        return this.http.post<any>(this.defaultUrl + '/assignedTask', assignedTask );
    }
   


      
}

 
