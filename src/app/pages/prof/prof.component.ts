import { Component, OnInit } from '@angular/core';
import { IntegrationPlanService } from '../service/evaluation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
  amira:any ; 
  public id:number ; 
  constructor(private modalService: NgbModal,  private test: IntegrationPlanService) {}

  ngOnInit(): void {
    setInterval(()=>this.id=Number(localStorage.getItem('id')),10) ; 
   setInterval(()=>console.log(this.id),10) ; 
     this.getInfor() ; 
  }
  public getInfor() {
    this.test.getInfor().subscribe(data =>
    { console.log(data) ; 
      this.amira = data ; }
  )} ; 
}
