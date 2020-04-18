import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationRecrutementComponent } from './evaluation-recrutement.component';

describe('EvaluationRecrutementComponent', () => {
  let component: EvaluationRecrutementComponent;
  let fixture: ComponentFixture<EvaluationRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
