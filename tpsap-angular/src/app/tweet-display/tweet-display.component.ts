import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-display',
  templateUrl: './tweet-display.component.html',
  styleUrls: ['./tweet-display.component.css']
})
export class TweetDisplayComponent implements OnInit {

  fullView = false;
  buttonText = "+";

  panelView(){
    this.fullView = !this.fullView;
    console.log("flipped" + this.fullView)

    if(this.fullView === false){
      this.buttonText = "+"
    } else {
      this.buttonText = "-"
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
