import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html',
  styleUrls: ['./eval-form.component.scss']
})
export class EvalFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

 constructor( private _formBuilder: FormBuilder ,public dialogRef: MatDialogRef<EvalFormComponent>){}

 title = 'popupdemo';

 
 ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
  this.thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
}
  close() {
    this.dialogRef.close();
  }

  

}
