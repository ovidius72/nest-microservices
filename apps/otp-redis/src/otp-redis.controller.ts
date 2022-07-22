import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OtpRedisService } from './otp-redis.service';

@Controller()
export class OtpRedisController {
  constructor(private readonly otpRedisService: OtpRedisService) {}

  @Get()
  getHello(): string {
    return this.otpRedisService.getHello();
  }

  @MessagePattern({ cmd: 'otp-mail-create' })
  createForMail(mail: string) {
    console.log('*****: mail', mail);
    console.log('****: OTP Maill create request in otp-redis service');
    console.log('****: OTP PHONE create request in otp-redis service');
    return { from: 'redis', value: 'mail otp' };
  }
  @MessagePattern({ cmd: 'otp-phone-create' })
  createForPhone(phoneNumber: string) {
    console.log('*****: phoneNumber', phoneNumber);
    console.log('****: OTP PHONE create request in otp-redis service');
    return { from: 'redis', value: 'phone otp' };
  }
}
