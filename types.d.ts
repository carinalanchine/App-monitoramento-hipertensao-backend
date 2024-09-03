declare namespace Express {
  export interface Request {
    user: {
      user_id: string;
      cpf: string;
      role: string;
      hospital_id: string;
    };
  }
  export interface Response {
    user: {
      user_id: string;
      cpf: string;
      role: string;
    };
  }
}
