import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from './user.service';

export type HTTPResponse<T> = {
  status: 'OK' | 'KO';
  payload: T;
};

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('OTP_SERVICE') private readonly otpService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('validate/:name/:otp')
  async validateOtp(
    @Param('name') name: string,
    @Param('otp') otp: string,
  ): Promise<HTTPResponse<boolean>> {
    const validation: Observable<boolean> = this.otpService.send('checkOtp', {
      otp,
      name,
    });
    const res = await firstValueFrom(validation, { defaultValue: false });
    console.log('*****: res', res);
    return { status: res ? 'OK' : 'KO', payload: res };
  }
  @Get('create/:name')
  async createOtp(@Param('name') name: string): Promise<HTTPResponse<string>> {
    const otpResponse: Observable<string> = this.otpService.send(
      'createOtp',
      name,
    );
    const res = await firstValueFrom(otpResponse);
    console.log('*****: res', res);
    return { status: res ? 'OK' : 'KO', payload: res };
  }
}
