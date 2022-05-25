import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateProviderDto } from './create-provider.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
