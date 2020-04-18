import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TextEditorComponent } from 'src/app/pages/text-editor/text-editor.component';
import { MatTable } from '@angular/material/table';
import { TemplateService } from '@progress/kendo-angular-excel-export';
import { Task } from 'src/app/models/task';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IntegrationPlanService } from '../service/evaluation';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface UsersData {
  name: string;
  id: number;
  title:string;
}
 

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  test2;
  addForm: FormGroup;
  i;
  errorMessage: string; 
  displayedColumns: string[] = ['title', 'name', 'action'];
  tasks:Task[];
  dataSources;
  dataSource =this.taskservice.tasks;
  exampleDatabase: TemplateserviceService | null;
  searchText:string="";
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  rows: FormArray;
  itemForm: FormGroup;
  public searchString: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  // new version 
  selection = false;
  userId: number;
  selectedTasks = [];
  closeResult: string;

  constructor(private modalService: NgbModal,private router: Router,private toastr: ToastrService,
    private matDialog: MatDialog,public dialog: MatDialog,
    private taskservice:TemplateserviceService, private activetedRoute: ActivatedRoute,
    private planIntegration: IntegrationPlanService) { }
  newDynamic: any = {};


  
  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe( params => {
      this.selection = params.selection
      this.userId = params.userId;
    });
    let self = this;  
    this.dataSources =this.taskservice.getTasks();
    self.taskservice.getPlns().subscribe(response => this.tasks = response,error => this.errorMessage = < any > error);  

}


 
  openDialog2() {
        
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(TextEditorComponent, {height: '900px',
    width: '800px',});
  }
 
 

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TextEditorComponent, {

      data:obj
    });
 
   
  }
  visible = true;
  

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    /*if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }*/

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
 
  
  /*
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.title != row_obj.title;
    });
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TextEditorComponent, {
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }*/
  
  addNew(issue: Task) {
    const dialogRef = this.dialog.open(TextEditorComponent, {
      data: {issue: issue }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.taskservice.getDialogData());
        
      }
    });
  }
  get(){
    this.taskservice.getPlns();
  }
  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
}

editUser(user: Task): void {
  localStorage.removeItem("detailsId");
  localStorage.setItem("detailsId", user.id.toString());
  this.router.navigate(['details']);
}



// cheked  push dans une liste  par id de user 
onChange($event, task) {
  if ($event) {
    this.selectedTasks.push(task);
  } else {
    this.selectedTasks = this.selectedTasks.filter(e => e.id != task.id);
  }
}

// ajout dans json assigned task et ajout dans prfile
onSave() {
  this.planIntegration.getAssignedTasks(this.userId).subscribe(res => {
    this.selectedTasks.forEach(e => res[0].tasks.push(e));
    // res[0].push(this.taskToCreate) 
    this.planIntegration.updateAssignedTasks(res[0].id, res[0]).subscribe(uRes => {
      this.router.navigate(['plan-integration' , this.userId]);
    });
  });

}
delete(task:Task){
  this.taskservice
  .deleteHero(task.id)
  .subscribe();
 

}
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
 
}