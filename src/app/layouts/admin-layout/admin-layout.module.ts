import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanIntegrationComponent } from 'src/app/pages/plan-integration/plan-integration.component';
import { EvaluationRecrutementComponent } from '../../pages/evaluation-recrutement/evaluation-recrutement.component'
import { RcComponent } from 'src/app/pages/rc/rc.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { EvalFormComponent } from '../../pages/eval-form/eval-form.component';
import { IntegrationComponent } from '../../pages/integration/integration.component'
import { ProjectManagementComponent} from 'src/app/pages/project-management/project-management.component';
import { ProjectManagementFormComponent} from 'src/app/pages/project-management-form/project-management-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
//import { FilterPipe} from 'src/app/pages/pipes/filter.pipe';
import { FilterPipe} from 'src/app/pages/pipes/filter.pipes';
import {MatChipsModule} from '@angular/material/chips';

import { PlanFormComponent } from 'src/app/pages/plan-form/plan-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatTabsModule} from '@angular/material/tabs'; 
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { TextEditorComponent } from 'src/app/pages/text-editor/text-editor.component';
import { TaskCreateComponent } from 'src/app/pages/task-create/task-create.component';
import{MatCardModule} from "@angular/material/card";
import{MatIconModule} from "@angular/material/icon";
import { DetailsComponent } from 'src/app/pages/details/details.component';
import { ProfilComponent } from '../../pages/profil/profil.component'
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatMenuModule} from '@angular/material/menu';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { ToastrModule } from 'ngx-toastr';
import { ModalBasicComponent } from '../../pages/modal-basic/modal-basic.component'
import { NgxPopper } from 'angular-popper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeTableModule } from 'primeng/treetable';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgxPopper,
    NgbModule,
    ClipboardModule,
    GridModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MDBBootstrapModule,
    MatMenuModule,
    AngularEditorModule ,
    MatDialogModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MDBBootstrapModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    DragDropModule,
    TreeTableModule,
    AccordionModule,
 
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    MapsComponent,
    PlanIntegrationComponent,
    EvaluationRecrutementComponent ,
    RcComponent,
    EvalFormComponent,
    FilterPipe,
    IntegrationComponent,
    ProjectManagementComponent,
    ProjectManagementFormComponent, 
    ProfilComponent, 
    ModalBasicComponent,
    FilterPipe,
    PlanFormComponent,
    TemplatesComponent,
    TextEditorComponent,
 TaskCreateComponent,
 DetailsComponent,
 
 

    

  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  



    //Plan,
    
  

})

export class AdminLayoutModule {}
