import { IsNumber, IsString, Min } from 'class-validator';

export class MutationStockMedicineDto{
  @IsNumber()
  @Min(1)
  stock: number;
}
