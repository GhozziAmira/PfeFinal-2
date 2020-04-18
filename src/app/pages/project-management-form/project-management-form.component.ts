import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-management-form',
  templateUrl: './project-management-form.component.html',
  styleUrls: ['./project-management-form.component.scss']
})
export class ProjectManagementFormComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ['Sap', 'Angular', 'Java', 'node js', 'PHP', 'C++'];
  members = new FormControl();
  membresList: string[] = ['Amira ghozzi', 'Refka hamzaoui ', 'Haythem aaber ', 'Emna  ben brahim', 'Héla ben messoued', 'Malek ghozzi'];

  constructor() { }

  
  ngOnInit(): void {
  }

}
