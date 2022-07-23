import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OtpRedisService } from './otp-redis.service';

@Controller()
export class OtpRedisController {
  constructor(private readonly otpRedisService: OtpRedisService) {}

  @MessagePattern({ cmd: 'otp-mail-create' })
  async createForMail(mail: string) {
    console.log('*****: mail', mail);
    console.log('****: OTP Maill create request in otp-redis service');
    console.log('****: OTP PHONE create request in otp-redis service');
    return { from: 'redis', value: 'mail otp' };
  }
  @MessagePattern({ cmd: 'otp-phone-create' })
  async createForPhone(phoneNumber: string) {
    console.log('*****: phoneNumber', phoneNumber);
    console.log('****: OTP PHONE create request in otp-redis service');
    return { from: 'redis', value: 'phone otp' };
  }
  @EventPattern('otp-requested')
  async otpRequested(phoneNumber: string) {
    console.log('*****: phoneNumber', phoneNumber);
    console.log('****: OTP PHONE create request in otp-redis service');
    return { from: 'redis', value: 'phone otp' };
  }
}
