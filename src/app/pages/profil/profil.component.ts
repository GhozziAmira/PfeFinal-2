import { Component, OnInit } from '@angular/core';
import { IntegrationPlanService } from '../service/evaluation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  amira:any ; //fel fichier lekher haka bedhebt declaritou ? module ? enti mouch kol comonent aandou module ou nn ?
  public id:number ; 
  public isCollapsedd = true;
  
  constructor(private modalService: NgbModal,private test: IntegrationPlanService) { }
  closeResult = '';

  ngOnInit(): void { 
       //setInterval(()=>this.id=Number(localStorage.getItem('id')),10) ; 
       //setInterval(()=>console.log(this.id),10) ; 
       this.getInfor() ; 
  
  }
  
  public getInfor() {
    this.test.getInfor().subscribe(data =>
    { console.log(data) ; 
      this.amira = data ; }
  )} ; 

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }
    );
  }

 
  }