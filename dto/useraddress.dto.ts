import { IsNumber } from 'class-validator';

export class UserAddressDto {
  @IsNumber()
  id: number;

  address: string;

  state: string;

  city: string;

  country: string;

  zip: string;

  isValidate: boolean;
}
