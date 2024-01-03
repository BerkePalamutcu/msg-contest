export interface AuthResponse {
  headers: any;
  body: {
    name: string;
    lastName: string;
    address: string;
    role: string;
    token: string;
    email: string;
  };
  statusCode: string;
  statusCodeValue: number;
}
