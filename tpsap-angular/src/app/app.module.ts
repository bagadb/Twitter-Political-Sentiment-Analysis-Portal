import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

import { UserPageComponent } from './user-page/user-page.component'

import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { UserDataService } from './adminpanel/userdata.service'
import { QuerypanelComponent } from './querypanel/querypanel.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    
    UserPageComponent,
    
    AdminpanelComponent,
    
    QuerypanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ LoginService, UserDataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
