import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectManagementFormComponent } from '../project-management-form/project-management-form.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
  
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ProjectManagementFormComponent,dialogConfig
    
    );

}
}