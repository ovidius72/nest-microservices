import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OtpModule } from './otp.module';

const logger = new Logger('OTP');
// this app implements the request-response Pattern
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OtpModule,
    {
      transport: Transport.TCP,
      options: {
        port: 4000,
      },
    },
  );
  await app.listen().then(() => logger.log('OTP Microservice Started'));
}
bootstrap();
