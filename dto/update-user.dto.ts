import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  firstName?: string;

  lastName?: string;

  password?: string;

  otp?: number;

  isValidate?: boolean;

  workPhone?: string;

  jobTitle?: string;

  phone?: string;

  refreshToken?: string;
}
