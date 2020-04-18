import { Component, OnInit, Input } from '@angular/core';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgControl, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import{Plan} from '../../models/plan';
import { IntegrationPlanService } from 'src/app/services/integration-plan.service';
import { IntegrationPlanService as Integration } from 'src/app/pages/service/evaluation'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id = this.activetedRoute.snapshot.params['id'];
  taskData: any = {};
  productID: any;
  productData: any;
  editForm: FormGroup;
  editSubForm : FormGroup;
  public toggleButton: boolean = true;
  user: Task;
 
  selection= false;
  userId: number;
  planList:Plan[];
  serviceintegration:IntegrationPlanService;
  errorMessage: string;  
  
   

  taskId: number;
  assignedTask: any;
  subtasks: any[];
  subTaskToEdit: any;
  // tslint:enable:max-line-length
  



  constructor(private activetedRoute: ActivatedRoute,
    private taskservice:TemplateserviceService,
    public router: Router,
    private integrationService:IntegrationPlanService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private integrationPlanService: Integration) {this.planList = []; }

  ngOnInit(): void {
    let userId = localStorage.getItem("detailsId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editSubForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      assigned: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.taskservice.getUserById(+userId)
      .subscribe( data => {

        this.editForm.setValue(data);
        console.log(data);
      });
      this.editForm.disable();
     
      this.activetedRoute.queryParams.subscribe( params => {
        this.selection = params.selection;
        this.userId = params.userId;
        this.taskId = params.taskId;
        if(this.selection) {
          this.integrationPlanService.getAssignedTasks(this.userId).subscribe(resp => {
            this.assignedTask = resp[0].tasks.find(e => e.id === +this.taskId);
            this.editForm.controls.title.setValue(this.assignedTask.title);
            this.editForm.controls.description.setValue(this.assignedTask.description);
            this.subtasks = this.assignedTask.subtasks;

            console.log(this.assignedTask.subtasks);
          });
        }

      });
      let self = this;  
    self.integrationService.getPlns().subscribe(response => this.planList = response
      ,error => this.errorMessage = < any > error);
  }
  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      this.taskservice.updateEmployee(this.id, this.taskData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }
  loadProductDetails(productID){
    this.taskservice.getProductDetails(productID).subscribe(product => {
      this.productData = product;
    });
  }
  navigation(link){
    this.router.navigate([link]);
  }
  onSubmit() {
    this.taskservice.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Task updated!', 'GREAT!');

          this.router.navigate(['templates']);
        },
        error => {
          alert(error);
        });
  }


  onSubmitt() {
    this.taskservice.updateUserr(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Task updated!', 'GREAT!');

          this.router.navigate(['plan-integration/' + this.userId]);
        },
        error => {
          alert(error);
        });
  }
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
enableFormGroup() {
  this.editForm.enable();
}

/*
navig() {
  this.router.navigate(['plan-integration' , this.userId]);
}*/

goToPlanIntegration() {
  if(this.editForm.invalid) {
    return;
  }
  this.integrationPlanService.getAssignedTasks(this.userId).subscribe(resp => {
    const aTask = resp[0];
    aTask.tasks = aTask.tasks.filter(e => e.id !== +this.taskId);
    this.assignedTask.description = this.editForm.controls.description.value;
    this.assignedTask.title =  this.editForm.controls.title.value;
    aTask.tasks.push(this.assignedTask);
    this.integrationPlanService.updateAssignedTasks(aTask.id, aTask).subscribe(r => {
      this.toastr.success('Task updated!', 'GREAT!');
      this.router.navigate(['plan-integration/' + this.userId]);
    });
  });

  
  
} 

openEditModal(subTaskToEdit) {
        this.subTaskToEdit = subTaskToEdit;
        console.log(this.subTaskToEdit);
        this.editSubForm.controls.title.setValue(this.subTaskToEdit.titlesub);
        this.editSubForm.controls.description.setValue(this.subTaskToEdit.descriptionsub);
        this.editSubForm.controls.assigned.setValue(this.subTaskToEdit.assigned);
           this.editSubForm.controls.priority.setValue(this.subTaskToEdit.priority);
           this.editSubForm.controls.status.setValue(this.subTaskToEdit.statusub);
    }

    onSubmitEdit() {
      if(this.editSubForm.invalid) {
        return;
      }
      this.subTaskToEdit.titlesub = this.editSubForm.controls.title.value;
      this.subTaskToEdit.descriptionsub = this.editSubForm.controls.description.value;
      this.subTaskToEdit.assigned = this.editSubForm.controls.assigned.value;
      this.subTaskToEdit.priority = this.editSubForm.controls.priority.value;
      this.subTaskToEdit.statusub = this.editSubForm.controls.status.value;

      this.subtasks = this.subtasks.filter(e => e.id !== +this.subTaskToEdit.id);
      this.subtasks.push(this.subTaskToEdit);
      this.assignedTask.subtasks = this.subtasks;
      this.integrationPlanService.getAssignedTasks(this.userId).subscribe(resp => {
        const aTask = resp[0];
        aTask.tasks = aTask.tasks.filter(e => e.id !== +this.taskId);
        aTask.tasks.push(this.assignedTask);
        this.integrationPlanService.updateAssignedTasks(aTask.id, aTask).subscribe(r => {
          this.toastr.success('Subtask updated!', 'GREAT!');
        });
      });
    }
    
}




