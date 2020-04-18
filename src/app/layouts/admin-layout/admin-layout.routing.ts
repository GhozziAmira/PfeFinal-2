import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { PlanIntegrationComponent } from '../../pages/plan-integration/plan-integration.component';
import { EvaluationRecrutementComponent } from '../../pages/evaluation-recrutement/evaluation-recrutement.component';
import { IntegrationComponent } from '../../pages/integration/integration.component';
import { ProjectManagementComponent } from 'src/app/pages/project-management/project-management.component';
import { ProjectManagementFormComponent } from 'src/app/pages/project-management-form/project-management-form.component';
import { ProfilComponent } from 'src/app/pages/profil/profil.component';
import { ModalBasicComponent } from '../../pages/modal-basic/modal-basic.component'
import { PlanFormComponent } from 'src/app/pages/plan-form/plan-form.component';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { TaskCreateComponent } from 'src/app/pages/task-create/task-create.component';
import { DetailsComponent } from 'src/app/pages/details/details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'plan-integration/:userId',           component: PlanIntegrationComponent },
    { path: 'plan-integration ',           component: PlanIntegrationComponent },
    { path: 'evaluation-recrutement',      component: EvaluationRecrutementComponent },
    { path: 'integration',      component: IntegrationComponent },
    { path: 'project-management',      component: ProjectManagementComponent },
    { path: 'project-management-form',      component: ProjectManagementFormComponent },
    { path: 'modal-basic', component: ModalBasicComponent },
    { path: 'profil', component: ProfilComponent },


    { path: 'task-create',           component: TaskCreateComponent},
  //  { path: 'plan-integration/:status', component: PlanIntegrationComponent },
    { path: 'plan-form', component: PlanFormComponent },
    { path: 'templates', component: TemplatesComponent },
    { path: 'details', component: DetailsComponent }


];
