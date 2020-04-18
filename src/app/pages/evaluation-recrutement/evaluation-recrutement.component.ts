import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EvalFormComponent } from '../../pages/eval-form/eval-form.component';
import { Eval } from "../../pages/model/eval";
import { IntegrationPlanService } from '../service/evaluation';


@Component({
  selector: 'app-evaluation-recrutement',
  templateUrl: './evaluation-recrutement.component.html',
  styleUrls: ['./evaluation-recrutement.component.scss']
})
export class EvaluationRecrutementComponent implements OnInit {
  title = 'popupdemo';
  
  tab: any ;  
  public searchString: string;


constructor(private matDialog: MatDialog, private test: IntegrationPlanService) {}

openDialog() {
  
  const dialogConfig = new MatDialogConfig();
  this.matDialog.open(EvalFormComponent,dialogConfig
  
  );
} // mk data
  ngOnInit() {
    this.getInfo() ; 
  }
  public getInfo() {
    this.test.getInfo().subscribe(data =>
    { console.log(data) ; 
      this.tab = data ; }
  )} ; 
  
}
