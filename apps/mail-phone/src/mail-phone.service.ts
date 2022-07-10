import { Injectable } from '@nestjs/common';

@Injectable()
export class MailPhoneService {
  getHello(): string {
    return 'Hello World!';
  }
}
