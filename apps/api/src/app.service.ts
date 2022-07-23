import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private redisClient: ClientProxy;
  constructor() {
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
  async sendMailCreated() {
    return this.redisClient.send({ cmd: 'otp-mail-create' }, '');
  }
  async sendMailCreatedAsync() {
    const res = await this.redisClient
      .send({ cmd: 'otp-mail-create' }, '')
      .toPromise();
    console.log('*****: res', res);
    return res;
  }
  async publishMailCreated() {
    return this.redisClient.emit('otp-requested', '');
  }
}
