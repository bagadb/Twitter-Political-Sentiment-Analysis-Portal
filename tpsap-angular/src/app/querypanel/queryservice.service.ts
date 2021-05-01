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

    constructor(private http: HttpClient) {

    }
}
