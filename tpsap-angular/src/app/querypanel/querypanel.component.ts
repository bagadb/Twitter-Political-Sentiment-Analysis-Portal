import { query } from '@angular/animations';
import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QueryService } from './queryservice.service';


@Component({
  selector: 'app-querypanel',
  templateUrl: './querypanel.component.html',
  styleUrls: ['./querypanel.component.css']
})

export class QuerypanelComponent implements OnInit {

  queryString = new FormControl('Modi');

  advancedFormGroup = new FormGroup({
    queryType: new FormControl('keyword'),
    queryAmount: new FormControl('10')
  });
  advancedOptionsShow = false;

  advancedOptionsRevealer(){
    this.advancedOptionsShow = !this.advancedOptionsShow;
  }
  
  tweetsJSON = '[ "No Tweets Scraped Yet" ]';

  @Output() messageTweetsJSON = new EventEmitter<any>();

  sendToDisplayComponent(){
    this.messageTweetsJSON.emit(this.tweetsJSON);
  }

  fireQuery(){

    var queryStringFinal = this.queryString.value + "\n" + this.advancedFormGroup.get('queryType').value + 
                          "\n" + this.advancedFormGroup.get('queryAmount').value;

    console.log(queryStringFinal);

    var queryObject = {
      queryString: this.queryString.value,
      queryType: this.advancedFormGroup.get('queryType').value,
      queryAmount: this.advancedFormGroup.get('queryAmount').value
    }

    var stringifiedObject = JSON.stringify(queryObject);

    this.QueryService.fireQueryandgetResponse(stringifiedObject).subscribe( data => {
    
      this.tweetsJSON = data;
      //console.log(this.tweetsJSON);
      this.sendToDisplayComponent();
    
  });
  }

  constructor(private QueryService: QueryService ) { }

  ngOnInit(): void {
  }

}
