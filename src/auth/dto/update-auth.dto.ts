import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDataDto } from './auth.dto';
// import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(UpdateUserDataDto) {}
