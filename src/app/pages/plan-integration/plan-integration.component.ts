import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfilComponent } from '../profil/profil.component';
import { IntegrationPlanService } from '../service/evaluation';
import { ProfComponent } from '../prof/prof.component';
import { GridModule, PDFModule, ExcelModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import{Plan} from '../../models/plan';
import { PlanFormComponent } from '../plan-form/plan-form.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { Task } from 'src/app/models/task';
import { task } from '../model/eval';
import { IntegrationPlanService as Integration } from 'src/app/pages/service/evaluation'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-plan-integration',
  templateUrl: './plan-integration.component.html',
  styleUrls: ['./plan-integration.component.scss'],
})
export class PlanIntegrationComponent implements OnInit {
  tasks:Task[];
  public isCollapsed = true;

  tab: any ;  
  amira:any ; 
  public searchString: string;
  public id:number ; 
  closeResult = '';
  dataSources;
  dataSource =this.taskservice.tasks;
 

  // new version 
  userInfo: any;
  assignedTasks: any;
  assignedTask:task[];
  public mySelection: string[] = [];
  subtasks: any[];
  userId:number;
  public show:boolean = false;
  public buttonName:any = 'Show tiles';
  color :string= "#172b4d";

  subtask: any;
  selectedAssignedTask: any;
  editSubForm: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: false,
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
  sub: any;
planList:Plan[];
stat:string;
serviceintegration:IntegrationPlanService;
errorMessage: string;  
searchText:string="";
extractParams(params):string{
  status = params.get('status')

  console.log('status: ', status)
  return ''
}
 

  ngOnInit() {
   // this.getInfoo() ; 
  this.getInfor() ;
  this.route.params.subscribe(params => {
   
    this.userId =params.userId;
    console.log(params);
    this.getUserInfo(params.userId);
    this.getAssignedTasks(params.userId)
  });

   
  let self = this;  
    status = ""
    //self.integrationService.getPlns().subscribe(response => this.planList = response,error => this.errorMessage = < any > error);  
    this.dataSources =this.taskservice.getTasks();

    this.editSubForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      assigned: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
   
  }




/*
  public getInfoo() {
    this.test.getInfoo().subscribe(data =>
    { console.log(data) ; 
      this.tab = data ; }
  )} ; 
  */
  public getInfor() {
    this.test.getInfor().subscribe(data =>
    { console.log(data) ; 
      this.amira = data ; }
  )} ; 

     
  

    constructor(private modalService: NgbModal,  private test:IntegrationPlanService,
      private integrationService:IntegrationPlanService,private matDialog: MatDialog,
      private route: ActivatedRoute,private router: Router ,private taskservice:TemplateserviceService,
      private integrationPlanService: Integration,
      private formBuilder: FormBuilder,
      private toastr: ToastrService) {
      this.planList = []; 
    }
  
  
    openDialog(id:number) {
     // localStorage.setItem('id',id.toString());
       
      //his.id=id ;
      const dialogConfig = new MatDialogConfig();
      this.matDialog.open(ProfilComponent,dialogConfig
      
      ); }
      openDialogg(id:number) {
        localStorage.setItem('id',id.toString());
       
      this.id=id ;
        const dialogConfig = new MatDialogConfig();
        this.matDialog.open(ProfComponent,dialogConfig
        
        ); 

        }
        
        // infooo
        getUserInfo(userId) {
          this.integrationService.getUserInfo(userId).subscribe(res => {
            this.userInfo = res;

          });
        }
//affichage de assigned tasks par user id 
        getAssignedTasks(userId) {
          this.integrationService.getAssignedTasks(userId).subscribe(res => {
            console.log(res);
            this.assignedTasks = res[0];
            console.log("AFDSSDFFSSDFSDDSFFSDFD");
            console.log(this.assignedTasks);
          });
        }

        openModal(subtask , /*Task id*/ assignedTask) {
          this.subtask = subtask;
          this.selectedAssignedTask = assignedTask;
           this.editSubForm.controls.title.setValue(this.subtask.titlesub);
           this.editSubForm.controls.description.setValue(this.subtask.descriptionsub);
           this.editSubForm.controls.assigned.setValue(this.subtask.assigned);
           this.editSubForm.controls.priority.setValue(this.subtask.priority);
           this.editSubForm.controls.status.setValue(this.subtask.statusub);

        }

        onSubmitEdit() {
          if(this.editSubForm.invalid) {
            return;
          }
          this.subtask.titlesub = this.editSubForm.controls.title.value;
          this.subtask.descriptionsub = this.editSubForm.controls.description.value;
          this.subtask.assigned = this.editSubForm.controls.assigned.value;
          this.subtask.priority = this.editSubForm.controls.priority.value;
          this.subtask.statusub = this.editSubForm.controls.status.value;

          const subtasks = this.selectedAssignedTask.subtasks.filter(e => e.id !== +this.subtask.id);
          subtasks.push(this.subtask);
          this.selectedAssignedTask.subtasks = subtasks;
          console.log(this.userId);
          this.integrationPlanService.getAssignedTasks(this.userId).subscribe(resp => {
            const aTask = resp[0];
            aTask.tasks = aTask.tasks.filter(e => e.id !== this.selectedAssignedTask.id);
            aTask.tasks.push(this.selectedAssignedTask);
            this.integrationPlanService.updateAssignedTasks(aTask.id, aTask).subscribe(r => {
              this.toastr.success('Subtask updated!', 'GREAT!');
            });
          });
        }

        
        editUser(user: task): void {
          localStorage.removeItem("detailsId");
          localStorage.setItem("detailsId", user.id.toString());
        }
       
    
   

 

 


  

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
     

      }
      get(){
       // this.integrationService.getPlns();
      }
      getstatus(){
       // this.integrationService.getPlans();
      }
      
      //openDialog() {
        
       // const dialogConfig = new MatDialogConfig();
       // this.matDialog.open(PlanFormComponent, {height: '900px',
       // width: '1000px',});
     // }
/*
     delete(assignedTask:assignedTask){
      this.integrationService
      .deleteHero(assignedTask.id)
      .subscribe();
     */





    toggle() {
      this.show = !this.show;
  
      // CHANGE THE NAME OF THE BUTTON.
      if(this.show)  
        this.buttonName = "Show tails";
      else
        this.buttonName = "Show Table";
    }

    toggleColor(){
      if( this.color === '#172b4d' )
        this.color = '#F5365C';
      else
        this.color = '#172b4d';
    }




    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.assignedTasks.tasks, event.previousIndex, event.currentIndex);
    }
    dropp(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.subtasks, event.previousIndex, event.currentIndex);
    }
    
    }




     
      
    
   
  
