import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'otp',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'otp',
          },
        },
      },
    ]),
  ],
  controllers: [OtpController],
  providers: [
    OtpService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['CLIENT_KAFKA'],
    },
  ],
})
export class OtpModule {}
