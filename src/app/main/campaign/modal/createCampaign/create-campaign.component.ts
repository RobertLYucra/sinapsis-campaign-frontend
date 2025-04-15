import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserList, UserResponse } from 'src/app/main/user/interfaces/UserResponse.model';
import { UserService } from 'src/app/main/user/services/user.service';
import { CampaignService } from '../../services/campaign.service';
import { CreateUpdateCampaignRequest } from '../../interfaces/create-update-campaign.model';
import { CampaignResponse } from '../../interfaces/campaign.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  constructor(

    public dialogRef: MatDialogRef<CreateCampaignComponent>,
    private userService: UserService, private fb: FormBuilder,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {

    this.campaignForm = this.fb.group({
      userId: [null, Validators.required],
      name: ['', Validators.required],
      phoneList: ['', Validators.required],
      messageText: ['', Validators.required]
    });

    this.getAllUsers();

  }

  campaignForm!: FormGroup;


  public usersList: UserList[] = []
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (resp: UserResponse) => {
        this.usersList = resp.data;
      },
      error: (error) => { console.log("Error", error) }
    });
  }

  public campaignResponse: CampaignResponse | undefined;


  createCampaign(): void {
    if (this.campaignForm.invalid) {
      this.campaignForm.markAllAsTouched(); // Muestra errores en el formulario
      return;
    }

    const formValue = this.campaignForm.value;

    const campaignData: CreateUpdateCampaignRequest = {
      name: formValue.name,
      phoneList: formValue.phoneList.replace(/\s+/g, ''),
      messageText: formValue.messageText,
      userId: formValue.userId
    };

    this.campaignService.createCampaign(campaignData).subscribe({
      next: (resp: CampaignResponse) => {
        this.campaignResponse = resp;
        if (resp.status) {
          Swal.fire({
            title: 'Campaña creado correctamente!',
            text: `${resp.message}: ${campaignData.name}`,
            icon: 'success',
            confirmButtonText: 'Ok', timer: 800, // Cierra el swal después de 1 segundo
            timerProgressBar: true, // Muestra una barra de progreso para el timer
            didOpen: () => {
              Swal.showLoading();
            },
          });
          this.dialogRef.close(true);
        } else {
          Swal.fire({
            title: 'ERROR!',
            text: `${resp.message}: ${campaignData.name}`,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }

      },
      error: (error) => { console.log("Error", error) }
    });
  }

}
