export interface ResponseData {
    success: boolean;
    token: string;
    user: {
      name: string;
      username: string;
      email: string;
    };
}