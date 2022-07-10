import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  getHello(name: string): string {
    console.log('*****: OTP Service: processing name', name);
    return `Hello ${name}!`;
  }
}
