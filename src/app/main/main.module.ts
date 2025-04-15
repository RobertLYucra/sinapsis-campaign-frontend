import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign/campaign.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';
import { MessageComponent } from './message/message.component';
import { CampaignModule } from './campaign/campaign.module';
import { MessageModule } from './message/message.Module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    CampaignModule,
    MessageModule
    
  ],
  declarations: [],
  exports:[CampaignComponent]
})
export class MainModule { }
