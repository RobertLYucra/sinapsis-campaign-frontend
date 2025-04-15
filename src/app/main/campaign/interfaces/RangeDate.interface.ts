export interface DateRangeParams {
    startDate?: string; // formato 'yyyy-MM-dd'
    endDate?: string;
    statusId ?: number;
  }
  

  export interface ProcessStatus {
    idProcess: number;
    process: string;
  }
  


  export const processes: ProcessStatus[] = [
    { idProcess: 3, process: 'Finalizada' },
    { idProcess: 2, process: 'En proceso' },
    { idProcess: 1, process: 'Pendiente' }
  ];
  