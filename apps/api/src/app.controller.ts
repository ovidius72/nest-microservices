import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('OTP_SERVICE') private readonly optService: ClientProxy,
  ) {}

  @Get('/:name')
  async getHello(@Param('name') name: string): Promise<string> {
    console.log('*****: name', name);
    console.log('*****: calling OTP_SERVICE');
    console.log('*****: optService', this.optService);
    const res = await this.optService.send('createOtp', name).toPromise();
    console.log('*****: res', res);
    return res;
  }
}
