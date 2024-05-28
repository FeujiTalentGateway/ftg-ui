export interface ForgotPasswordRequest {
  otp:string
  email: string;
  newPassword: string;
}
