import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MIN,
  min,
  MinLength,
} from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString({ message: 'product must be a string' })
  @MinLength(2, { message: 'product must be at least 2 characters' })
  @MaxLength(20, { message: 'product must be at most 20 characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  category: string;
  @IsMongoId()
  @IsString()
  subcategory: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
