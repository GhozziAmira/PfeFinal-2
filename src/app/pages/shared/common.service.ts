import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  myObj : Observable<any> ; 
  private mySubject=new Subject<any>() ; 
  
  constructor() {
    this.myObj=this.mySubject.asObservable() ; 
   }
   
   message(data:any) {
     console.log(data) ; 
     this.mySubject.next(data) ; 

   }

}
