import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormAddComponent } from './pages/form-add/form-add.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToastrModule } from 'ngx-toastr';

import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,

    MatExpansionModule,

    GridModule,
        ToastrModule.forRoot(),
        

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FormAddComponent,
    AppComponent,
    
    
  
    
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
