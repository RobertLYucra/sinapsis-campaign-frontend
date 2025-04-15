export interface CampaignResponse {
    status: boolean;
    code: number;
    message: string;
    data: Campaign[];
  }
  
  export interface Campaign {
    idCampaign: number;
    name: string;
    processDate: string; 
    processHour: string; 
    processStatus_id: number;
    processStatus_name: string;
    phoneList: string;
    messageText: string;
    userId:number;
    userName: string;
    send_status: string;
    customer : string;
  }
  

  export interface FilterCampaign {
    startDate?: string;
    endDate?: string;
    status?: string;
  }