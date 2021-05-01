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

    modifyUserData(username, password) {

        var encodedUsername = btoa(username);

        var encodedPassword = btoa(password);

        return this.http.get(this.ApiURL + "/modify/" + encodedUsername + "-" + encodedPassword, { responseType: "text" });

    }

    deleteUserData(username) {

        var encodedUsername = btoa(username);

        return this.http.get(this.ApiURL + "/delete/" + encodedUsername, { responseType: "text" });
    
    }

    addNewUser(username, password) {

        var encodedUsername = btoa(username);

        var encodedPassword = btoa(password);
        
        return this.http.get(this.ApiURL + "/add/" + encodedUsername + "-" + encodedPassword, { responseType: "text" });

    }
    
    constructor(private http: HttpClient) {

    }
}
