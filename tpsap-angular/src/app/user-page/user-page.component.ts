import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  loggedInUser: String

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.loggedInUser = params['username'];
    });
   }

  ngOnInit(): void {
  }

}
