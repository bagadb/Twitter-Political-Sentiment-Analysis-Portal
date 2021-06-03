import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() recievedAggregationData: string;

  parsedAggregation: Object;

  OP = 0; 
  MP = 0;
  MoP = 0;
  SP = 0;
  N = 0;
  SN = 0;
  MoN = 0;
  MN = 0;
  ON = 0;


  dataString = "[" + this.OP + "," + this.MP + "," + this.MoP + "," + this.SP + "," + this.N + "," + this.SN + "," + this.MoN + "," + this.MN + "," + this.ON + "]"  
  // [ , , , , ]
  imagePath = "https://quickchart.io/chart?c={type:'bar',data:{labels:[OP,MP,MoP,SP,N,SN,MoN,MN,ON],datasets:[{label:'Users',data:" + this.dataString + "}]}}";

  ngOnChanges(){
    this.parsedAggregation = JSON.parse(this.recievedAggregationData)
    console.log(this.parsedAggregation);
    this.imagePath = "https://quickchart.io/chart?c={type:'bar',data:{labels:[OP,MP,MoP,SP,N,SN,MoN,MN,ON],datasets:[{label:'Users',data:" + this.dataString + "}]}}";
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
