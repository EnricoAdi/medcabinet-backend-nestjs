import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsNumber()
  @Min(1000)
  price: number;

  @IsString()
  image: string;  
}
