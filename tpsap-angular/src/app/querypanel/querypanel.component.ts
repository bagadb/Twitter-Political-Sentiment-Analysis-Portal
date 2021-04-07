import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-querypanel',
  templateUrl: './querypanel.component.html',
  styleUrls: ['./querypanel.component.css']
})
export class QuerypanelComponent implements OnInit {

  queryString = new FormControl('')

  fireQuery(){
    console.log(this.queryString.value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
