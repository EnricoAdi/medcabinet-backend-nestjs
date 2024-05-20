import { IsArray, IsNumber, Min } from "class-validator";

export class DetailTransactionDto {
  @IsNumber()
  medicine_id: number;

  @IsNumber()
  @Min(1)
  quantity: number;
   
}
