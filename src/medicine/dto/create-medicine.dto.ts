import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1000)
  price: number;


  @IsNumber()
  @Min(0)
  stock: number;  

  @IsString()
  image: string;  
}
