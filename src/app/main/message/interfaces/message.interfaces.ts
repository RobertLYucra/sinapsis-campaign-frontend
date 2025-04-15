export interface MessageResponse {
    status: boolean;
    code: number;
    message: string;
    data: MessageByCampaign[];
  }
  
  export interface MessageByCampaign {
    idMessage: number;
    campaigName: string;
    processDate: string; // formato YYYY-MM-DD
    processHour: string; // formato HH:mm:ss
    shippingStatus: number; // Ej: 1 = Pendiente, 2 = Enviado, 3 = Error (por ejemplo)
    shippingStatusName: string; // Ej: "Enviado", "Pendiente", "Error"
    phone: string;
    messageText: string;
    CampaignId: number;
  }
  
  