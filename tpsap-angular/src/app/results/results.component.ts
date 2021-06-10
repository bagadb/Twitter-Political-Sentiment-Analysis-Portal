import { Component, Input, OnInit } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() recievedAggregationData: "{}";

  @Input() recievedPieChartData: "{}";

  parsedAggregation: {
    "ntrl": number,
    "slght_pst":number,
    "mdrt_pst":number,
    "mst_pst":number,
    "ovwhm_pst":number,
    "slght_ngt":number,
    "mdrt_ngt":number,
    "mst_ngt":number,
    "ovwhm_ngt":number
  };

  parsedPieChartData: {
    "pol": number,
    "nonpol": number
  }

  OP = 0; 
  MP = 0;
  MoP = 0;
  SP = 0;
  N = 0;
  SN = 0;
  MoN = 0;
  MN = 0;
  ON = 0;

  politicalQuantity = 19;
  nonPoliticalQuantity = 29;

  dataSetBar = this.OP + "," + this.MP + "," + this.MoP + "," + this.SP + "," +
            this.N + "," +
            this.ON + "," + this.MN + "," + this.MoN + "," + this.SN

  dataSetPie = this.politicalQuantity + "," + this.nonPoliticalQuantity

  barChartURL = "https://quickchart.io/chart/render/zm-ce5b65bb-cbd2-442b-a4c1-1444051fd125?title=Sentiment Ranges&?data1=" + this.dataSetBar;

  pieChartURL = "https://quickchart.io/chart/render/zm-741957db-bcce-4f75-8e29-816e9738bf3f?data1="  + this.dataSetPie;

  ngOnChanges(){
  
    this.parsedAggregation = JSON.parse(this.recievedAggregationData)
    console.log(this.parsedAggregation);

    this.OP = this.parsedAggregation.ovwhm_pst; 
    this.MP = this.parsedAggregation.mst_pst;
    this.MoP = this.parsedAggregation.mdrt_pst;
    this.SP = this.parsedAggregation.slght_pst;
    this.N = this.parsedAggregation.ntrl;
    this.SN = this.parsedAggregation.slght_ngt;
    this.MoN = this.parsedAggregation.mdrt_ngt;
    this.MN = this.parsedAggregation.mst_ngt;
    this.ON = this.parsedAggregation.ovwhm_ngt;

    this.parsedPieChartData = JSON.parse(this.recievedPieChartData);

    console.log(this.recievedPieChartData)

    this.politicalQuantity = this.parsedPieChartData.pol;
    this.nonPoliticalQuantity = this.parsedPieChartData.nonpol;
    
    this.dataSetBar = this.OP + "," + this.MP + "," + this.MoP + "," + this.SP + "," +
            this.N + "," +
            this.ON + "," + this.MN + "," + this.MoN + "," + this.SN

    this.dataSetPie = this.politicalQuantity + "," + this.nonPoliticalQuantity

    this.barChartURL = "https://quickchart.io/chart/render/zm-ce5b65bb-cbd2-442b-a4c1-1444051fd125?data1=" + this.dataSetBar + "&title=Aggregation";
    
    this.pieChartURL = "https://quickchart.io/chart/render/zm-741957db-bcce-4f75-8e29-816e9738bf3f?data1="  + this.dataSetPie;

  }

  constructor() { }

  ngOnInit(): void {

  }

}