import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/:name')
  // async getHello(@Param('name') name: string): Promise<string> {
  //   console.log('*****: name', name);
  //   console.log('*****: calling OTP_SERVICE');
  //   console.log('*****: optService', this.optService);
  //   const res = await this.optService.send('createOtp', name).toPromise();
  //   console.log('*****: res', res);
  //   return res;
  // }
  // @Get('/redis')
  // async getRedis() {
  //   console.log('*****: calling OTP_REDIS');
  //   console.log('*****: otpRedis', this.otpRedis);
  //   const res = this.otpRedis.send({ cmd: 'otp-mail-create' }, '');
  //   console.log('*****: res', res);
  //   const value = await firstValueFrom(res);
  //   console.log('*****: value', value);
  //   return value;
  // }
  @Get('/sendMail')
  async sendMail() {
    return this.appService.sendMailCreated();
  }
  @Get('/sendMailAsync')
  async sendMailAsync() {
    return this.appService.sendMailCreatedAsync();
  }
  @Get('/publish')
  async publish() {
    return this.appService.publishMailCreated();
  }
}
