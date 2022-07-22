import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('OTP_SERVICE') private readonly optService: ClientProxy,
    @Inject('OTP_REDIS') private readonly otpRedis: ClientProxy,
  ) {}

  // @Get('/:name')
  // async getHello(@Param('name') name: string): Promise<string> {
  //   console.log('*****: name', name);
  //   console.log('*****: calling OTP_SERVICE');
  //   console.log('*****: optService', this.optService);
  //   const res = await this.optService.send('createOtp', name).toPromise();
  //   console.log('*****: res', res);
  //   return res;
  // }
  @Get('/redis')
  async getRedis() {
    console.log('*****: calling OTP_REDIS');
    console.log('*****: otpRedis', this.otpRedis);
    const res = this.otpRedis.send({ cmd: 'otp-mail-create' }, '');
    console.log('*****: res', res);
    const value = await firstValueFrom(res);
    console.log('*****: value', value);
    return value;
  }
}
