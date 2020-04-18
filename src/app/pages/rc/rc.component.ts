import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-rc',
  templateUrl: './rc.component.html',
  styleUrls: ['./rc.component.scss']
})
export class RcComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RcComponent>, private matDialog: MatDialog) {
}
ngOnInit() {
}
  


}
