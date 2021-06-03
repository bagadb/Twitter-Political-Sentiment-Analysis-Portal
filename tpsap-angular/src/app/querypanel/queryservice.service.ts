import { Injectable } from '@angular/core';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { QueryValueType } from '@angular/compiler/src/core';

@Injectable()
export class QueryService {

    port = 8080;
    ApiURL = "http://localhost:" + this.port + "/queryprocessor" ;

    fireQueryandgetResponse( query: string ){

        var encodedString = btoa(query);

        console.log("sent '" + encodedString + "'")

        return this.http.get(this.ApiURL + "/" + encodedString, { responseType: "text" })
    }

    gatherSentimentScores(){
        return this.http.get("http://localhost:" + this.port + "/sentimentscores", { responseType: "text" })
    }

    gatherClassifierScores(){
        return this.http.get("http://localhost:" + 5000 + "/predict", { responseType: "text" })
    }

    gatherAggregationdata(){
        return this.http.get("http://localhost:" + 8080 + "/visualization/aggregation", { responseType: "text" })
    }
    constructor(private http: HttpClient) {

    }
}
