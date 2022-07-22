import { Test, TestingModule } from '@nestjs/testing';
import { OtpRedisController } from './otp-redis.controller';
import { OtpRedisService } from './otp-redis.service';

describe('OtpRedisController', () => {
  let otpRedisController: OtpRedisController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OtpRedisController],
      providers: [OtpRedisService],
    }).compile();

    otpRedisController = app.get<OtpRedisController>(OtpRedisController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(otpRedisController.getHello()).toBe('Hello World!');
    });
  });
});
