import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OTP_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 4000,
        },
      },
      {
        name: 'OTP_REDIS',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    // ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
