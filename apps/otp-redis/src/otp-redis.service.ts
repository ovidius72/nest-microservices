import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpRedisService {
  getHello(): string {
    return 'Hello World!';
  }
}
