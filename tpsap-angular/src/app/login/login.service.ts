import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class LoginService {

    port = 8080;
    ApiURL = "http://localhost:" + this.port + "/login/" ;

    loginFunction(username, password){
        
        var loginDetails = JSON.stringify({ 
            username: username,
            password: password
        });

        console.log(loginDetails)

        return this.http.post(this.ApiURL,loginDetails, {
            observe: 'body',
            responseType: 'text'
        });
        
    }
    
    constructor(private http: HttpClient) {

    }
}
