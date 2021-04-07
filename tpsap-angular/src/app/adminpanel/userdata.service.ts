import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserDataService {

    port = 8080;
    ApiURL = "http://localhost:" + this.port + "/adminfunctions" ;

    getUserData(){
        return this.http.get(this.ApiURL);
    }

    modifyUserData() {

    }

    deleteUserData() {

    }

    addNewUser() {

    }
    
    constructor(private http: HttpClient) {

    }
}
