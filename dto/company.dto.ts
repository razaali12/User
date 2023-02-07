import { IsNumber } from 'class-validator';

export class CompanyDto {
  @IsNumber()
  id: number;

  companyName: string;
}
