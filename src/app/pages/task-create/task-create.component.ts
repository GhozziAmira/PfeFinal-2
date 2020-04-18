import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { Task, subtasks } from 'src/app/models/task';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material/chips';

import {  ActivatedRoute } from '@angular/router';
import { IntegrationPlanService } from '../service/evaluation';
import {COMMA, ENTER} from '@angular/cdk/keycodes'


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
task:Task;
errorMessage: string; 

temmpl:TemplatesComponent;
guestForm: FormGroup;
addForm: FormGroup;
title:string='';
description:string='';
displayedColumns: string[] = ['title','description'];
  dataSource=this.taskservice.tasks ;
  tasks:Task[];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
isLoadingResults = false;
animal: string;
  name: string;


  selectionn = false;
  userId: number;

  rows: FormArray;
  itemForm: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private toastr: ToastrService,
    private matDialog: MatDialog,private http:HttpClient,
    private activetedRoute: ActivatedRoute, public dialog: MatDialog,
    private taskservice:TemplateserviceService,private router:Router,
    private formBuilder: FormBuilder ,private planIntegration: IntegrationPlanService) {
   
   }
getTask(){
  this.taskservice.getPlns();
}
  ngOnInit(): void {
  
    this.addForm = new FormGroup({
     id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      // Create skills form group
      subtasks: new FormGroup({
        idsub: new FormControl(),
        titlesub: new FormControl(),
        descriptionsub: new FormControl(),
      })
    });
    let self = this;  


self.taskservice.getPlns().subscribe(response => this.tasks = response,error => this.errorMessage = < any > error);  

//selection 
this.activetedRoute.queryParams.subscribe( params => {
  this.selectionn = params.selectionn;
  this.userId = params.userId;
});

this.addForm = new FormGroup({
  id: new FormControl(),
   title: new FormControl(),
   description: new FormControl(),
   // Create skills form group
   subtasks: this.formBuilder.array([
     this.addSkillFormGroupe()
   ]),
  /* tags: this.formBuilder.array([
     this.addtagFormGroupe()
   ])*/
 
 });
  }
  openDialog() {
    
    const dialogRef = this.dialog.open(TextEditorComponent, {
      width:'900px'
      
    });
    
    
    
  }
  
  


 
  
  
  


  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '250px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


 

addme(task: Task){
this.taskservice.creatme(task)
.subscribe(data=>{
alert('Done');

})
}
onSubmit() {
  const taskToUpdate  = this.addForm.value;
  taskToUpdate.id = Math.floor(Math.random() * Math.floor(100000));
  this.taskservice.createUser(taskToUpdate)
    .subscribe( data => {
      this.toastr.success('Task created!', 'GREAT!');
      this.router.navigate(['templates']);
    });
}
onSave() {
  this.planIntegration.getAssignedTasks(this.userId).subscribe(res => {
    const taskToUpdate  = this.addForm.value;
    taskToUpdate.id = Math.floor(Math.random() * Math.floor(100000));
    res[0].tasks.push(this.addForm.value) 
    this.planIntegration.updateAssignedTasks(res[0].id, res[0]).subscribe(uRes => {
      this.router.navigate(['plan-integration' , this.userId]);
    });
  });
}

openDialog2(): void {
  const dialogRef = this.dialog.open(TextEditorComponent, {
    width: '300px',
    data: {}
  });
  
}
addSkillFormGroupe():FormGroup{
  return this.formBuilder.group({
    titlesub: new FormControl(),
    descriptionsub: new FormControl()
    
  });
}

addSkillButtonClick(): void {
  (<FormArray>this.addForm.get('subtasks')).push(this.addSkillFormGroupe());
  
}
resetForm(){
  this.addSkillFormGroupe().reset();
}



 


}
