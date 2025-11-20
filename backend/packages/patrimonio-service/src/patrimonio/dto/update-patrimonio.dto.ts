import { PartialType } from '@nestjs/swagger';
import { CreatePatrimonioDto } from './create-patrimonio.dto';

export class UpdatePatrimonioDto extends PartialType(CreatePatrimonioDto) {}

