import { JsonPipe } from '@angular/common';
import { Input, Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tweet-display',
  templateUrl: './tweet-display.component.html',
  styleUrls: ['./tweet-display.component.css']
})

export class TweetDisplayComponent implements OnInit {

  @Input() recievedTweets: string;

  @Input() recievedSentimentScores: string;

  @Input() recievedClassifierData: string;

  parsedTweets: any;
  stringsFromTweets: string[];

  parsedSentiments: any;

  parsedClassifierData: string;
  
  fullView = true;
  buttonText = "-";
  
  panelView(){
    this.fullView = !this.fullView;
    
    if(this.fullView === false){
      this.buttonText = "+"
    } else {
      this.buttonText = "-"
    }
  }

  parseNewData(){

    this.parsedTweets = JSON.parse(this.recievedTweets);

    this.stringsFromTweets = this.parsedTweets;
    
  }


  ngOnChanges(changes: SimpleChanges) { 
    
    this.parseNewData();

    this.parsedSentiments = JSON.parse(this.recievedSentimentScores);


    var temp = this.recievedClassifierData.replace(/\\"/g, '"'); ;

    this.parsedClassifierData = JSON.parse(temp.slice(1,-2));

    console.log(this.parsedClassifierData);
   
  }
  
  constructor() {

  }
  
  ngOnInit(): void {
    
  }

}
