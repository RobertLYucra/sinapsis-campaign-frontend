import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CampaignResponse } from '../interfaces/campaign.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_CAMPAIGN } from 'src/app/core/constants/url.constants';
import { CreateUpdateCampaignRequest } from '../interfaces/create-update-campaign.model';
import { DateRangeParams } from '../interfaces/RangeDate.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }
 
  getAllCampaign(): Observable<CampaignResponse> {
    return this.http.get<CampaignResponse>(API_CAMPAIGN);
  }

  getAllCampaignRangeDate(dateRangeParams: DateRangeParams): Observable<CampaignResponse> {

    return this.http.post<CampaignResponse>(`${API_CAMPAIGN}/filter`, dateRangeParams);
  }

  createCampaign(Campaign: CreateUpdateCampaignRequest): Observable<CampaignResponse> {
    return this.http.post<CampaignResponse>(API_CAMPAIGN, Campaign);
  }

  sendMessagesByCampaign(idCampaign: number): Observable<CampaignResponse> {
    return this.http.get<CampaignResponse>(`${API_CAMPAIGN}/notificar/${idCampaign}`);
  }

  updateCampaign(Campaign: CreateUpdateCampaignRequest): Observable<CampaignResponse> {
    return this.http.put<CampaignResponse>(API_CAMPAIGN, Campaign);
  }

  deleteCampaign(idCampaign: number): Observable<CampaignResponse> {
    return this.http.delete<CampaignResponse>(`${API_CAMPAIGN}/${idCampaign}`);
  }
}