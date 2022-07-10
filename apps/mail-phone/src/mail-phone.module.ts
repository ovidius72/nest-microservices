import { Module } from '@nestjs/common';
import { MailPhoneController } from './mail-phone.controller';
import { MailPhoneService } from './mail-phone.service';

@Module({
  imports: [],
  controllers: [MailPhoneController],
  providers: [MailPhoneService],
})
export class MailPhoneModule {}
