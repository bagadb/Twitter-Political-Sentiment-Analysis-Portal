import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from './login.service'

import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('')
  
  password = new FormControl('')

  
  getAuth(username, password){
    console.log("Sending\nUsername: '" + username + "'" + "\nPassword: '" + password + "'")
    this.LoginService.loginFunction(username, password).subscribe(data => {
      console.log(data)
      if (data == "OK") {
        this.router.navigate(['/portal',username]);
      }else {
        this.username.reset();
        this.password.reset();
      }
    })
  }
  
  onSubmit(event) {
    this.getAuth(this.username.value, this.password.value);
  }

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

}
