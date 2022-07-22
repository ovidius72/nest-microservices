import { Module } from '@nestjs/common';
import { OtpRedisController } from './otp-redis.controller';
import { OtpRedisService } from './otp-redis.service';

@Module({
  imports: [],
  controllers: [OtpRedisController],
  providers: [OtpRedisService],
})
export class OtpRedisModule {}
