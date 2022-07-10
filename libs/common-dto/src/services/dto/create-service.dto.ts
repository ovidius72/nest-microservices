import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { EventDto } from './event.dto';

export class CreateServiceDto extends PartialType(EventDto) {
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  tags: string[];
}
