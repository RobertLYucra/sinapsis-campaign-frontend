import { Component, OnInit, ViewChild } from '@angular/core';
import { Campaign, CampaignResponse, FilterCampaign } from './interfaces/campaign.interface';
import { CampaignService } from './services/campaign.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateCampaignComponent } from './modal/createCampaign/create-campaign.component';
import { UpdateCampaignComponent } from './modal/updateCampaign/update-campaign.component';
import { DateRangeParams, processes, ProcessStatus } from './interfaces/RangeDate.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'campaign-app',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor(private campaignService: CampaignService, private dialog: MatDialog,) { }

  ngOnInit() {
    this.getAllCampaigns()
  }

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  procesos: ProcessStatus[] = processes;

  displayedColumns: string[] = [
    "accions",
    'idCampaign',
    'name',
    'processDate',
    'processHour',
    'processStatus_name',
    'phoneList',
    'messageText',
    'send_status'
  ];


  public campaigns: Campaign[] = [];

  getCampaignDateRange(): void {
    const startDate = this.range.value.start
      ? this.range.value.start.toISOString().slice(0, 10)
      : "";

    const endDate = this.range.value.end
      ? this.range.value.end.toISOString().slice(0, 10)
      : "";

    const idProcess = +this.selectedEstado;

    const params: DateRangeParams = {
      startDate,
      endDate,
      statusId: idProcess
    }

    this.campaignService.getAllCampaignRangeDate(params).subscribe({

      next: (resp: CampaignResponse) => {

        this.campaigns = [];
        this.campaigns = resp.data;
        this.dataSource = new MatTableDataSource(this.campaigns);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => { console.log("Error", error) }
    });
  }


  dataSource = new MatTableDataSource<Campaign>(this.campaigns);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAllCampaigns(): void {
    this.campaignService.getAllCampaign().subscribe({

      next: (resp: CampaignResponse) => {
        this.campaigns = resp.data;
        this.dataSource = new MatTableDataSource(this.campaigns);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (error) => { console.log("Error", error) }
    });
  }

  public campaignResponse: CampaignResponse | undefined;

  sendMessagesByCampaign(campaign: Campaign) {
    Swal.fire({
      title: '¿Enviar Notificación?',
      text: `¿Estás seguro de enviar notificación: ${campaign.name}?`,
      icon: 'question',
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#1976d2',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Enviar!',
      reverseButtons:true,
      showCancelButton: true,
      scrollbarPadding: false,

    }).then((result) => {
      if (result.isConfirmed) {
        this.campaignService.sendMessagesByCampaign(campaign.idCampaign).subscribe({
          next: (resp: CampaignResponse) => {
            this.campaignResponse = resp;
            if (resp.status) {
              Swal.fire({
                title: 'Campaña notificado correctamente!',
                text: `${resp.message}: ${campaign.name}`,
                icon: 'success',
                confirmButtonText: 'Ok', timer: 800, // Cierra el swal después de 1 segundo
                timerProgressBar: true, // Muestra una barra de progreso para el timer
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              this.getAllCampaigns();
            } else {
              Swal.fire({
                title: 'ERROR!',
                text: `${resp.message}: ${campaign.name}`,
                icon: 'warning',
                confirmButtonText: 'Ok',
              });
            }

          },
          error: (error) => { console.log("Error", error) }
        });

        this.getAllCampaigns();
      };
    });
  }


  deleteCampaign(campaign: Campaign) {
    Swal.fire({
      title: '¿Eliminar Campaña?',
      text: `¿Estás seguro de eliminar Campaña: ${campaign.name}?`,
      icon: 'question',
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#1976d2',
      confirmButtonText: 'Si, Eliminar!',
      showCancelButton: true,
      reverseButtons:true,
      scrollbarPadding: false,

      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.campaignService.deleteCampaign(campaign.idCampaign).subscribe({
          next: (resp: CampaignResponse) => {
            this.campaignResponse = resp;
            if (resp.status) {
              Swal.fire({
                title: 'Campaña eliminado correctamente!',
                text: `${resp.message}: ${campaign.name}`,
                icon: 'success',
                confirmButtonText: 'Ok', timer: 800, // Cierra el swal después de 1 segundo
                timerProgressBar: true, // Muestra una barra de progreso para el timer
                didOpen: () => {
                  Swal.showLoading();
                },

              });
              this.getAllCampaigns();

            } else {
              Swal.fire({
                title: 'ERROR!',
                text: `${resp.message}: ${campaign.name}`,
                icon: 'warning',
                confirmButtonText: 'Ok',
              });
            }
            this.getAllCampaigns();
          },
          error: (error) => { console.log("Error", error) }
        });

        this.getAllCampaigns();
      };
    });
  }

  createCampaign(DATA?: any) {
    this.dialog
      .open(CreateCampaignComponent, { width: '490px', data: DATA }) // height:'80%'
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getAllCampaigns();
        }
      });
  }

  updateCampaign(DATA: Campaign) {
    this.dialog
      .open(UpdateCampaignComponent, { width: '490px', data: DATA })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getAllCampaigns();
        }
      });
  }

  getMessagesByCampaign(DATA: Campaign) {
    this.dialog
      .open(MessageComponent, { width: '70%', data: DATA })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getAllCampaigns();
        }
      });
  }

  public selectedEstado: string = 'Todos';

  resetFiltros(): void {

    // resetear select a "Todos"
    this.selectedEstado = 'Todos';

    // resetear rango de fechas
    this.range.setValue({ start: null, end: null });

    this.filterByStatus(this.selectedEstado)
    // opcional: también restablece campañas filtradas si usas una variable aparte
    // this.dataSource.data = [...this.campaigns];

    this.getAllCampaigns(); // recarga data original

  }

  public listSecondCampaigs: Campaign[] = [];

  filterByStatus(process: string): void {
    this.getCampaignDateRange()
  }
}
