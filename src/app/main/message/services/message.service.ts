import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_MESSAGE } from 'src/app/core/constants/url.constants';
import { MessageResponse } from '../interfaces/message.interfaces';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private http: HttpClient) { }

    getMessageByCampaign(idCampaign:number): Observable<MessageResponse> {
        return this.http.get<MessageResponse>(`${API_MESSAGE}/${idCampaign}`);
    }
}