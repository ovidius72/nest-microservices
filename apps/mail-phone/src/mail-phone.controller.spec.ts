import { Test, TestingModule } from '@nestjs/testing';
import { MailPhoneController } from './mail-phone.controller';
import { MailPhoneService } from './mail-phone.service';

describe('MailPhoneController', () => {
  let mailPhoneController: MailPhoneController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailPhoneController],
      providers: [MailPhoneService],
    }).compile();

    mailPhoneController = app.get<MailPhoneController>(MailPhoneController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailPhoneController.getHello()).toBe('Hello World!');
    });
  });
});
