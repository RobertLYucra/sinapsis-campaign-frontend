import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_USER } from 'src/app/core/constants/url.constants';
import { UserList, UserResponse } from '../interfaces/UserResponse.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<UserResponse> {

        return this.http.get<UserResponse>(API_USER);
    }
}