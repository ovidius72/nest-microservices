import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OtpRedisModule } from './otp-redis.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OtpRedisModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  console.log('Starting OTP_REDIS');
  await app.listen();
}
bootstrap();
