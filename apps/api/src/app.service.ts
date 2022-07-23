import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  // private redisClient: ClientProxy;
  // constructor() {
  //   this.redisClient = ClientProxyFactory.create({
  //     transport: Transport.REDIS,
  //     options: {
  //       host: 'localhost',
  //       port: 6379,
  //     },
  //   });
  // }
  constructor(@Inject('OTP_REDIS') private readonly redisClient: ClientProxy) {}
  async sendMailCreated() {
    console.log('senging to redis');
    return this.redisClient.send({ cmd: 'otp-mail-create' }, 'send email');
  }
  async sendMailCreatedAsync() {
    console.log('senging async to redis');
    const res = await this.redisClient
      .send({ cmd: 'otp-mail-create' }, 'send email async')
      .toPromise();
    console.log('*****: res', res);
    return res;
  }
  async publishMailCreated() {
    console.log('publishing to redis');
    return this.redisClient.emit('otp-requested', 1818);
  }
}
