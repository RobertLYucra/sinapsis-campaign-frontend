export interface UserResponse {
    status: boolean;
    code: number;
    message: string;
    data: UserList[];
  }
  
  export interface UserList {
    idUser: number;
    username: string;
    
  }
  