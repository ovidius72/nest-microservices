import { Controller, Get } from '@nestjs/common';
import { MailPhoneService } from './mail-phone.service';

@Controller()
export class MailPhoneController {
  constructor(private readonly mailPhoneService: MailPhoneService) {}

  @Get()
  getHello(): string {
    return this.mailPhoneService.getHello();
  }
}
