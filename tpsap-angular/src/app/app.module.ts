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
import { QueryService } from './querypanel/queryservice.service';
import { TweetDisplayComponent } from './tweet-display/tweet-display.component';
import { ResultsComponent } from './results/results.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    
    UserPageComponent,
    
    AdminpanelComponent,
    
    QuerypanelComponent,
    
    TweetDisplayComponent,
    
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ LoginService, UserDataService, QueryService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
