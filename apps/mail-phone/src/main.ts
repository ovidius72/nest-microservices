import { NestFactory } from '@nestjs/core';
import { MailPhoneModule } from './mail-phone.module';

async function bootstrap() {
  const app = await NestFactory.create(MailPhoneModule);
  await app.listen(3000);
}
bootstrap();
