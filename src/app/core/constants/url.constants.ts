const ENVIROMENT: string = 'PROD';
// const ENVIROMENT: string = 'DEV';


let BASE_CAMPAIGN_NOTIFICATION = ''

switch (ENVIROMENT) {
  case 'DEV':
    BASE_CAMPAIGN_NOTIFICATION = 'http://localhost:3000/api/';
    break;
  case 'QA':
    // BASE_CAMPAIGN_NOTIFICATION = 'http://localhost:3000/api/';
    break;
  case 'PROD':
    BASE_CAMPAIGN_NOTIFICATION = 'https://u20p7u4p5i.execute-api.us-east-1.amazonaws.com/api/' // AMAZON PROD    
    break;
  default:
    break;
}

// REGISTRO-CAMPAIGN
export const API_CAMPAIGN = BASE_CAMPAIGN_NOTIFICATION + 'campaign';
export const API_USER = BASE_CAMPAIGN_NOTIFICATION + 'users';
export const API_MESSAGE = BASE_CAMPAIGN_NOTIFICATION + 'messages';
