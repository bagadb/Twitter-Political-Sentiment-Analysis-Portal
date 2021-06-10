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
    queryAmount: new FormControl('10'),
    excludeRetweet: new FormControl(false)
  });
  advancedOptionsShow = false;

  advancedOptionsRevealer(){
    this.advancedOptionsShow = !this.advancedOptionsShow;
  }
  
  tweetsJSON = '[ "No Tweets Scraped Yet" ]';

  sentimentScores = "[ 0 ]";

  classifierScores = '"["Non-Political"]" ';

  aggregationData = "{}";

  pieChartData = "{}"
  
  gatherSentimentScores() {
    this.QueryService.gatherSentimentScores().subscribe( data => {
      this.sentimentScores = data;
    })
  }

  gatherClassifierScores() {
    this.QueryService.gatherClassifierScores().subscribe( data => {
      this.classifierScores = data;
    })
  }

  gatherAggregationData() {
    this.QueryService.gatherAggregationdata().subscribe( data => {
      this.aggregationData = data;
    })
  }

  gatherPieChartData() {
    this.QueryService.gatherPieChartdata().subscribe(data => {
      this.pieChartData = data;
      console.log(data);
    })
  }

  renderVisualization(){
    this.gatherAggregationData();
    this.gatherPieChartData();
  }

  fireQuery(){

    var queryStringFinal = this.queryString.value + "\n" + this.advancedFormGroup.get('queryType').value + 
                          "\n" + this.advancedFormGroup.get('queryAmount').value;

    console.log(queryStringFinal);

    var queryObject = {
      queryString: this.queryString.value,
      queryType: this.advancedFormGroup.get('queryType').value,
      queryAmount: this.advancedFormGroup.get('queryAmount').value,
      queryXRT: this.advancedFormGroup.get('excludeRetweet').value
    }

    var stringifiedObject = JSON.stringify(queryObject);

    this.QueryService.fireQueryandgetResponse(stringifiedObject).subscribe( data => {
    
      this.tweetsJSON = data;

  });
  }

  constructor(private QueryService: QueryService ) { }

  ngOnInit(): void {
  }

}
