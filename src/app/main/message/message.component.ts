import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MessageService } from './services/message.service';
import { MessageByCampaign, MessageResponse } from './interfaces/message.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Campaign } from '../campaign/interfaces/campaign.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  displayedColumns: string[] = [
    'idMessage',
    'campaigName',
    'processDate',
    'processHour',
    'shippingStatusName',
    'phone',
    'messageText'
  ];

  public messagesByCampaign: MessageByCampaign[] = [];
  public dataSource = new MatTableDataSource<MessageByCampaign>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public campaignDataParams: Campaign,
    public dialogRef: MatDialogRef<MessageComponent>
  ) {}

  ngOnInit() {
    this.getMessagesByCampaign(this.campaignDataParams.idCampaign);
  }

  getMessagesByCampaign(idCampaign: number): void {
    this.messageService.getMessageByCampaign(idCampaign).subscribe({
      next: (resp: MessageResponse) => {
        this.messagesByCampaign = resp.data;
        this.dataSource = new MatTableDataSource(this.messagesByCampaign);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }
}