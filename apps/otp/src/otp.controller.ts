import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OtpService } from './otp.service';

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @MessagePattern('getOTPName')
  getHello(name: string): string {
    console.log('*****: OTP: controller reveived name', name);
    return this.otpService.getHello(name);
  }
}
