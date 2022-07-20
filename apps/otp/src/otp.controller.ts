import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OtpService } from './otp.service';

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @MessagePattern('sendPhoneOTP')
  sendPhoneOTP(phoneNumber: string): string {
    console.log('*****: CREATE OTP: controller received name', phoneNumber);
    return this.otpService.create(phoneNumber);
  }
  @MessagePattern('sendEmailOTP')
  sendEmailOTP(email: string): string {
    console.log('*****: CREATE OTP: controller received name', email);
    return this.otpService.create(email);
  }
  @MessagePattern('checkOtp')
  checkOtp({ name, otp }: { name: string; otp: string }): boolean {
    console.log('*****: CHECK OTP: controller received name', name, otp);
    return this.otpService.check({ otp, name });
  }
}
