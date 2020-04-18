import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Show tails';
bool =true ;
color :string= "#2DCE89";
isCollapsed=false ; 
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Show tails";
    else
      this.buttonName = "Show Table";
  }

  toggleColor(){
    if( this.color === '#2DCE89' )
      this.color = '#F5365C';
    else
      this.color = '#2DCE89';
  }
}
