import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementFormComponent } from './project-management-form.component';

describe('ProjectManagementFormComponent', () => {
  let component: ProjectManagementFormComponent;
  let fixture: ComponentFixture<ProjectManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
