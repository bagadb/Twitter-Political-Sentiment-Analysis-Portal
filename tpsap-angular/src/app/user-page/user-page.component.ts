import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AdminpanelComponent } from '../adminpanel/adminpanel.component'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  
  AdminLogin = false;
  loggedInUser: String;

  listOfTabs = [ "Query Panel" ];

  
  selectedTab = 0;
  
  switchTab(tabNumber){
    this.selectedTab = tabNumber;
  }
  
  tweetsJSON: any;

  sendTweetsToDisplay($event) {
    this.tweetsJSON = $event;
  }
  
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.loggedInUser = params['username'];
      if (this.loggedInUser == "admin"){
        this.AdminLogin = true;
        this.listOfTabs = [ "Query Panel" , "Admin Panel" ];
      }
    });
  }
  
  
  ngOnInit(): void {
  }

}
