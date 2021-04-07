import { Component, OnInit } from '@angular/core';
import { UserDataService } from './userdata.service'

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  listOfUsers: any;
  numberOfUsers = 0;

  getUserData(){
    this.UserDataService.getUserData().subscribe( data => {
      this.listOfUsers = data;
      console.log(this.listOfUsers);
      this.numberOfUsers = this.listOfUsers.length + 1;
    })
  }

  modifyUserData(username, password){
    
  }

  deleteUserData(username, password){

  }

  addNewUser(username, password){

  }

  constructor(private UserDataService: UserDataService) { }

  ngOnInit(): void {
    this.getUserData();

  }

}
