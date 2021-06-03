import { Input, Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tweet-display',
  templateUrl: './tweet-display.component.html',
  styleUrls: ['./tweet-display.component.css']
})

export class TweetDisplayComponent implements OnInit {

  @Input() recievedTweets: string;

  parsedTweets: any;

  stringsFromTweets: string[];
  
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

  parseNewData(tweetsString){

    this.parsedTweets = JSON.parse(this.recievedTweets);
    
    
    this.stringsFromTweets = this.parsedTweets;
    
    console.log(this.stringsFromTweets);
  }

  ngOnChanges(changes: SimpleChanges) {
        
    this.parseNewData(changes.recievedTweets.currentValue);

    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
  }
  
  constructor() {

  }
  
  ngOnInit(): void {
    
  }

}
