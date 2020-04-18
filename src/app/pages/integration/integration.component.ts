import { Component, OnInit } from '@angular/core';
import { RcComponent } from '../../pages/rc/rc.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { IntegrationPlanService } from 'src/app/services/integration-plan.service';
import{Plan} from '../../models/plan';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  planList:Plan[];
  serviceintegration:IntegrationPlanService;
  errorMessage: string;  
  
  searchText2:string
  userId: number;
  searchText:string="";
  public searchString: string;



 
  constructor(private router: Router,
    private route: ActivatedRoute,
    private activetedRoute: ActivatedRoute,
    private integrationService:IntegrationPlanService,
    private matDialog: MatDialog) { 
    this.planList = []; 

  }
  
  ngOnInit() {
    let self = this;  
    self.integrationService.getPlns().subscribe(response => this.planList = response,error => this.errorMessage = < any > error);  
    this.activetedRoute.queryParams.subscribe( params => {
      this.userId = params.userId;
    });
  }
  openDialog() {
  
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(RcComponent,dialogConfig
    
    );

    
    }
    get(){
      this.integrationService.getPlns()
    
  }


  goToPlanIntegration(userId) {
    this.router.navigate(['plan-integration/' + userId ]);
  } 
}
