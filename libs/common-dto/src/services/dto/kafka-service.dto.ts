import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';
import { DeleteServiceDto } from './delete-service.dto';
import { EventDto } from './event.dto';
import { UpdateServiceDto } from './update-service.dto';

export class kafkaServideDto {
  @Type(() => EventDto, {
    discriminator: {
      property: 'eventType',
      subTypes: [
        { value: CreateServiceDto, name: 'CreateServiceDto' },
        { value: UpdateServiceDto, name: 'UpdateServiceDto' },
        { value: DeleteServiceDto, name: 'DeleteServiceDto' },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  @IsNotEmpty()
  value: CreateServiceDto | UpdateServiceDto | DeleteServiceDto;
}
