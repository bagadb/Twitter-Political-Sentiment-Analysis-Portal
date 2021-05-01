import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QueryService } from './queryservice.service'

@Component({
  selector: 'app-querypanel',
  templateUrl: './querypanel.component.html',
  styleUrls: ['./querypanel.component.css']
})
export class QuerypanelComponent implements OnInit {

  queryString = new FormControl('')

  result: any;

  fireQuery(){

    this.QueryService.fireQueryandgetResponse(this.queryString.value).subscribe( data => {
      this.result = data;
      console.log(this.result);
    });    
  }

  constructor(private QueryService: QueryService ) { }

  ngOnInit(): void {
  }

}
