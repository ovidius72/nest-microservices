import { Inject, Injectable, Logger } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { CreateServiceDto, UpdateServiceDto } from '@sekurest/common-dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ServicesService {
  constructor(@Inject('KAFKA_PRODUCER') private kafkaProducer: Producer) {}
  create(createServiceDto: CreateServiceDto) {
    const id = randomUUID();
    this.sendKafkaEvent(`${id}`, {
      eventType: 'ServiceCreated',
      id,
      ...createServiceDto,
    });
    return 'API: This action adds a new service';
  }

  findAll() {
    this.sendKafkaEvent(`findAll`, {
      eventType: 'ServiceRequested',
      ...{ id: 1, name: 'Service All' },
    });
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    updateServiceDto.id = id;
    this.sendKafkaEvent(`${id}`, {
      eventType: 'ServiceUpdated',
      ...updateServiceDto,
    });
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    this.sendKafkaEvent(`${id}`, { eventType: 'ServiceDeleted', id });
    return `This action removes a #${id} service`;
  }

  sendKafkaEvent(key: string, value: any) {
    const jsonValue = JSON.stringify(value);
    const message = { key, value: jsonValue };
    Logger.debug(
      `sending message: ${JSON.stringify(message, null, 2)}`,
      'ServicesService',
    );
    this.kafkaProducer
      .send({
        topic: 'api-services',
        messages: [{ key, value: jsonValue }],
      })
      .then((ret) => {
        console.log('*****: ret', ret);
      });
  }
}
