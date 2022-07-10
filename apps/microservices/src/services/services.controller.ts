import { Controller, Logger, ValidationPipe } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateServiceDto,
  DeleteServiceDto,
  UpdateServiceDto,
  kafkaServideDto,
} from '@sekurest/common-dto';
// This controller is notified by KAFKA
// when a service is created, updated or deleted
// as an api-service topic.
@Controller()
export class ServicesController {
  constructor(private eventEmitter: EventEmitter2) {}

  @EventPattern('api-services')
  serviceEvent(@Payload(new ValidationPipe()) { value }: kafkaServideDto) {
    Logger.debug(value, 'ServicesController - serviceEvent');
    this.eventEmitter.emit(value.eventType, value);
  }

  @OnEvent('ServiceCreated')
  handleServiceCreated(createServiceDto: CreateServiceDto) {
    Logger.debug(
      createServiceDto,
      'Microservice ServicesController - handleServiceCreated',
    );
  }

  @OnEvent('ServiceUpdated')
  handleServiceUpdated(updateServiceDto: UpdateServiceDto) {
    Logger.debug(
      updateServiceDto,
      'Microservice ServicesController - handleServiceUpdated',
    );
  }

  @OnEvent('ServiceDeleted')
  handleServiceDeletedEvent(deleteServiceDto: DeleteServiceDto) {
    Logger.debug(
      deleteServiceDto,
      'Microservice ServicesController - handleServiceDeletedEvent',
    );
  }
}
