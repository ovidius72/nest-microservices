import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

describe('OtpController', () => {
  let otpController: OtpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [OtpService],
    }).compile();

    otpController = app.get<OtpController>(OtpController);
  });

  describe('send Email OTP: Should Succeed', () => {
    it('should return a valid OTP', () => {
      const respose = otpController.sendEmailOTP('jack@example.com');
      expect(respose).toBeDefined();
    });
  });
  describe('sende Email OTP: Should fail', () => {
    it('should return a valid OTP', () => {
      const respose = otpController.sendEmailOTP('');
      expect(respose).toBeUndefined();
    });
  });
});
