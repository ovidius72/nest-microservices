import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Producer } from 'kafkajs';

const otps = new Map<string, string>();

@Injectable()
export class OtpService {
  constructor(
    @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer,
    @Inject('OTP_REDIS') private otpRedis: ClientProxy,
  ) {}

  create(name: string, expiry = 10): string | undefined {
    console.log('*****: expiry', expiry);
    const otp = randomUUID();
    if (!name) {
      return undefined;
    }
    console.log('*****: OTP Service: creating OTP for', name);
    console.log('*****: OTP is:', otp);
    otps.set(otp, name);

    return otp;
  }
  check({ otp, name }: { otp: string; name: string }): boolean {
    console.log('*****: OTP Service: checking OTP for', otp);
    const storedOtp = otps.get(otp);
    console.log('*****: item exists', !!storedOtp);

    if (storedOtp && storedOtp === name) {
      otps.delete(otp);
      return true;
    }
    return false;
  }
  sendKafkaEvent(key: string, value: any) {
    const jsonValue = JSON.stringify(value);
    const message = { key, value: jsonValue };
    Logger.debug(
      `sending OTP message: ${JSON.stringify(message, null, 2)}`,
      'OTP Service',
    );
    this.kafkaProducer
      .send({
        topic: 'otp-service',
        messages: [{ key, value: jsonValue }],
      })
      .then((ret) => {
        console.log('*****: ret', ret);
      });
  }
}
