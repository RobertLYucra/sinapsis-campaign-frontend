import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateCampaignComponent } from './modal/createCampaign/create-campaign.component';
import { UpdateCampaignComponent } from './modal/updateCampaign/update-campaign.component';
import { CampaignComponent } from './campaign.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ CampaignComponent,CreateCampaignComponent, UpdateCampaignComponent],
  exports:[CreateCampaignComponent, UpdateCampaignComponent,CampaignComponent]
})
export class CampaignModule { }
