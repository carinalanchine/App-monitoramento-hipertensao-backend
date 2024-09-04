declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      cpf: string;
      role: string;
      hospitalId: string;
    };
  }
  export interface Response {
    user: {
      userId: string;
      cpf: string;
      role: string;
    };
  }
}
