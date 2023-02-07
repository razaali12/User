import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CompanyDto } from './company.dto';
import { UserAddressDto } from './useraddress.dto';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  lastName: string;

  @IsNotEmpty()
  password: string;

  otp: number;

  isValidate: boolean;

  workPhone: string;

  jobTitle: string;

  phone: string;
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;
}
