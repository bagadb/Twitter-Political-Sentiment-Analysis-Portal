import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDataService } from './userdata.service'

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})

export class AdminpanelComponent implements OnInit {

  listOfUsers: any;
  numberOfUsers = 0;

  newUsername = new FormControl('');
  
  newPassword = new FormControl('');


  getUserData(){
    this.UserDataService.getUserData().subscribe( data => {
      this.listOfUsers = data;
      console.log(this.listOfUsers);
      this.numberOfUsers = this.listOfUsers.length + 1;
    })
  }

  modifyUserData(username, password){
    
    this.UserDataService.modifyUserData(username, password).subscribe(
      data => {
        console.log(data);
      }
    )
    
    this.getUserData();

  }

  deleteUserData(username){

    this.UserDataService.deleteUserData(username).subscribe(
      data => {
        console.log(data);
      }
    )
    
    this.getUserData();

  }

  addNewUser(username, password){

    this.UserDataService.addNewUser(username, password).subscribe(
      data => {
        console.log(data);
      }
    )
    
    this.getUserData();

  }

  constructor(private UserDataService: UserDataService) { }

  ngOnInit(): void {

    this.getUserData();

  }

}
